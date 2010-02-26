$(document).ready(function(){ // this is executed when the DOM is ready 

/* 	-----------------------------------------------------------------
 	CONSTRUCTORS
	these could preferably be put into another file :) 
	----------------------------------------------------------------- */

function Canvas(){ 

	var obj = {},
		scopeObservers = [],
		zoomObservers = [],
		//data
		minYear = 0,
		maxYear = 2009,
		yearsPrScreen = 40;

	// observer Design Pattern (zoom)
	obj.addZoomObserver = function(observer) {
		zoomObservers.push(observer);
	};

	obj.removeZoomObserver = function(observer) {};
	obj.zoomChanged = function(){
		$.each(zoomObservers, function(i,n){
			zoomObservers[i].zoomChanged(obj);
		});
	};

	// observer Design Pattern (scope)
	obj.addScopeObserver = function(observer) {
		scopeObservers.push(observer);
	};

	obj.removeScopeObserver = function(observer) {};

	obj.scopeChanged = function(){
		$.each(scopeObservers,function(i,n){
			scopeObservers[i].scopeChanged(obj);
		});
	}; 

	// getters/setters 
	obj.yearsPrScreen = function(){ return yearsPrScreen; };
	obj.setYearsPrScreen = function(_yearsPrScreen){ 
		var newval = (_yearsPrScreen > 10) ? _yearsPrScreen : 10 ;
		yearsPrScreen = newval; 
		obj.zoomChanged(); 
	};

	obj.minYear = function(){ return minYear/1; };
	obj.setminYear = function(_minYear){ minYear = _minYear; return obj; };

	obj.maxYear = function(){ return maxYear/1; };
	obj.setmaxYear = function(_maxYear){ maxYear = _maxYear; return obj; };
	
	obj.calculateYearFromXCoordinate = function( xCoordinate ){
		var pixelsPrYear = $('#paper').width() / yearsPrScreen;
		return Math.round(xCoordinate / pixelsPrYear) + minYear;
	};
	
	obj.centerCanvasAt = function( year ){
		if (year+yearsPrScreen/2 > 2009) { 
			obj.setminYear(2009 - yearsPrScreen);
			obj.setmaxYear(2009); //@TODO absolute max year is hard-coded here
		} else if ( year-yearsPrScreen/2 < 0) { 
			obj.setminYear(0); //@TODO absolute min year is hard-coded here
			obj.setmaxYear(0+yearsPrScreen);
		} else {
			obj.setminYear(year - yearsPrScreen/2);	
			obj.setmaxYear(year + yearsPrScreen/2);
			obj.scopeChanged();
		}
	};

	return obj;
};

function DiscoveryView(_discovery, discoveryController ,canvasController) {

	// -----------------------------------------------------------------
	// UTILITY  
	// -----------------------------------------------------------------
	function calculateXoffset(year){
		var yearWidth = $('#paper').width() / canvasController.canvas().yearsPrScreen(),
			delta = year - canvasController.canvas().minYear();

		return yearWidth*delta;
	};

	function calculateWidth() {
		return $('#paper').width() / canvasController.canvas().yearsPrScreen();
	}

	function inactiveState(){
		return {"fill":"#4CBF2F", stroke: '#fff', "stroke-width" : calculateWidth()/10, "opacity" : 0.5 , 'scale':1};
	}

	function activeState(){
		return {"fill":"#fff", stroke: '#4CBF2F', "stroke-width" : calculateWidth()/10, "opacity" : 1, 'scale':3};
	}


	var obj = {},
		modelDiscovery = _discovery,
		raphaelGraphics = null,
		dependencyLines = null,
		clicked = false; // uhh, model state in the view :O 


	raphaelGraphics = function(){ // create the view
		return canvasController.raphaelCanvas().rect(
			calculateXoffset(modelDiscovery.year),
			Math.random()*500,
			calculateWidth(),
			calculateWidth()).attr(inactiveState());
	}();

	function createPathStringTo( dependency ){
		return pathString = "M" + obj.xOffset() + " " + obj.yOffset() + "L" + dependency.xOffset() + " " + dependency.yOffset();	
	};

	obj.drawLines = function (){ // function to draw the lines 
		dependencyLines = $.map(modelDiscovery.dependencies, function(n){
			var dependency = discoveryController.getDiscoveryWithId(n);
				pathString = createPathStringTo( dependency );
			return 	{
						'line' : canvasController.raphaelCanvas().path(pathString).attr({'stroke':'#88128c', 'stroke-width':2}),
						'modelDiscovery' : dependency
					};
		});
	};

	obj.yOffset = function() {
		return raphaelGraphics.attrs.y;
	};
	obj.xOffset = function() {
		return calculateXoffset(modelDiscovery.year);
	};

	// Registrer observers 
	canvasController.canvas().addScopeObserver(obj);
	canvasController.canvas().addZoomObserver(obj);

	// scope event
	// --------------
	obj.scopeChanged = function(observable) {
		var delta = calculateXoffset(modelDiscovery.year);
		raphaelGraphics.attr({x:delta});
		$.each(dependencyLines, function(i,n){
			n.line.attr({path : createPathStringTo( n.modelDiscovery )});
		});
	};	

	// zoom event
	// --------------
	obj.zoomChanged = function(observable) {
		raphaelGraphics.animate({
					'x':calculateXoffset(modelDiscovery.year),
					'width':calculateWidth(),
					'height':calculateWidth()
				}, 500);
		$.each(dependencyLines, function(i,n){
			n.line.animate({path: createPathStringTo(n.modelDiscovery)}, 500);
		});
	};

	function onMouseClick(event) {
		if (clicked) {
			raphaelGraphics.animate(inactiveState(), 300);
			clicked = false;
		} else {
			discoveryController.setSelectedDiscovery(_discovery);
			raphaelGraphics.animate(activeState(), 300);
			clicked = true;
		}
		event.stopPropagation();
	};

	function onDoubleClick(event) {
		event.stopPropagation(); // prevents the canvas from zooming
	};

	function onMouseOver(event){

	};

	function onMouseOut(event){

	};

	$(raphaelGraphics.node)
		.bind('click',function(event){ onMouseClick(event); })
		.bind('mouseover',function(event){ onMouseOver(event); })
		.bind('mouseout',function(event){ onMouseOut(event); })
		.bind('dblclick', function(event){ onDoubleClick(event); })
		.css({'cursor':'pointer'});

	return obj;

}

function CanvasController(){


	var obj = {},
		canvas = Canvas(),
		raphaelCanvas = null;

	obj.canvas = function(){ return canvas; };	
	obj.raphaelCanvas = function(){ return raphaelCanvas; };
	
	obj.createRaphaelCanvas = function(){ 
		raphaelCanvas = Raphael('paper',$('#paper').width(),$('#paper').height()); 
		
		jqRaphaelCanvas = $('#paper');
		jqRaphaelCanvas
			.bind('mousedown', function( event ){ // pressed, now move oppisite direction of mouse
				var clickedYear = canvas.calculateYearFromXCoordinate( event.clientX ),
					minYear = canvas.minYear(),
					maxYear = canvas.maxYear(),
					yearsPrScreen = canvas.yearsPrScreen();
				jqRaphaelCanvas.mousemove( function( event ){	
					var pixelsPrYear = $('#paper').width() / canvas.yearsPrScreen(),
						year = Math.round( event.clientX / pixelsPrYear) + minYear,
						delta = clickedYear - year;
					canvas.centerCanvasAt( delta + (minYear + yearsPrScreen/2) );
				});
			})
			.bind('mouseup', function(){
				jqRaphaelCanvas.unbind('mousemove');
			})
			.bind('dblclick', function( event ){
				var clickedYear = canvas.calculateYearFromXCoordinate(event.clientX );
				canvas.setminYear(clickedYear - canvas.yearsPrScreen()/2);	
				canvas.setmaxYear(clickedYear + canvas.yearsPrScreen()/2);
				canvas.setYearsPrScreen( canvas.yearsPrScreen() - 10);
			});
	};

	obj.sliderChangedEvent = function( year ){
		canvas.centerCanvasAt( year + canvas.yearsPrScreen()/2 );
		uki('#hud-message').text( canvas.minYear() + ' - ' + canvas.maxYear() );
	};
	
	
	return obj;
}

function DiscoveryController( canvasController ) {

	var obj = {},
		selectionObservers = [],
		discoveries = {},
		selectedDiscovery = {};


	// observer Design Pattern 
	obj.addDiscoverySelectEventObserver = function(observer) {
		selectionObservers.push(observer);
	};

	obj.removeDiscoverySelectEventObserver = function(observer) {};

	obj.selectionChanged = function(){
		$.each(selectionObservers,function(i,n){
			selectionObservers[i].selectionChanged(obj);
		});
	};


	obj.getDiscoveryWithId = function(id){
		return discoveries[id];
	};

	// getters and setters
	obj.selectedDiscovery = function(){ return selectedDiscovery; };
	obj.setSelectedDiscovery = function(_selectedDiscovery){ selectedDiscovery = _selectedDiscovery; obj.selectionChanged(); };


	obj.loadData = function(){
		// get data and create discoveries
		// $.get('http://localhost:8080/json/discoveries', function(data){
		$.get('http://86.58.184.137:9999/json/discoveries', function(data){
			var arr = eval(data);
			$.each(arr, function(i,n){
				var id = arr[i].id;
				discoveries[id] = DiscoveryView(arr[i], obj, canvasController);
			});
			$.each(discoveries, function(i,n){
				console.log("calling draw lines"); // @DEBUGGING
				n.drawLines();
			});
		});
	};

	return obj;
}

/* 	-----------------------------------------------------------------
 	GUI CODE
	The following lines of codes creates the GUI. I'm using the 
	http://ukijs.org/ javascript library for this. 
	----------------------------------------------------------------- */
function setUpGUI(mainController) {
	
	uki(
	{
		view: 'Box',
		rect: '1000 600',
		anchors: 'left top right bottom',
		childViews: 
		[
			{ // left side
				view: 'Box',
				rect: '0 0 800 600',
				anchors: 'left top right bottom',
				childViews:
				[{	
					view: 'Box', // canvas
					rect: '0 0 800 560', 
					anchors: 'left top right bottom',
					style: { background: 'url(images/black.png) top left'},
					id: 'paper'
				},
				{
					view: 'Box', // hud display
					rect: '0 0 800 80',
					background: '#000',
					anchors: 'top left right',
					style: { opacity: '0.5'},
					id: 'hud',
					childViews: 
					[ 
						{ 	view: 'Label', 
							rect: '0 0 800 24',  
							text: '1989 - 2009', 
							id: 'hud-message',
							anchors: 'top left right',
							style: { fontWeight: 'bold', fontSize: '40px', textAlign: 'center', marginTop: '25px', color: '#fff'}
						}
					]
				},
				{	
					view: 'Box', 
					rect: '0 560 800 40', 
					background: 'theme(panel)',
					anchors: 'bottom right left',
					id: 'slider-box',
					childViews: [ {view: 'Slider', rect: '25 10 750 24', anchors: 'bottom right left', max: 2009} ]
				}]
			},
			Sidebar().view()
		]
	}).attachTo( window, '1000 600' );

	function Sidebar() {
		var obj = {},
			view = {
				view: 'Box',
				rect: '800 0 200 600',
				anchors: 'top right bottom',
				background: '#DCDCDD',
				style: { borderLeft: '2px solid #777'},
				childViews:
				[ 
					{ 	view: 'Label', 
						rect: '10 10 190 24', 
						multiline: true,
						textSelectable: true,
						anchors: 'top left right', 
						text: 'Clear text field',
						id: 'selectedDiscoveryLabel'
					},
					{	view: 'Button', 
						rect: '10 560 40 35', 
						anchors: 'left bottom', 
						text: 'In',
						id: 'zoomin_btn'						
					},
					{	view: 'Button', 
						rect: '60 560 40 35', 
						anchors: 'left bottom', 
						text: 'Out',
						id: 'zoomout_btn'						
					},
					{	view: 'Button', 
						rect: '110 560 40 35', 
						anchors: 'left bottom', 
						text: 'Full',
						id: 'zoomfull_btn'						
					}
				]};

		mainController.discoveryController().addDiscoverySelectEventObserver(obj);

		obj.selectionChanged = function(observable){
			uki('#selectedDiscoveryLabel').text(observable.selectedDiscovery().description);
		};

		obj.view = function(){ return view; };
		
		return obj; 
	};

	// events 
	uki('#zoomout_btn').bind('click',function(){ mainController.zoomOutEvent(); });
	uki('#zoomin_btn').bind('click',function(){ mainController.zoomInEvent(); });
	uki('#zoomfull_btn').bind('click',function(){ mainController.zoomFullEvent(); });
	uki('Slider').bind('change', function() {
		function getYearFromString(str) {
			return str.split('.')[0] /1;
		};
		mainController.canvasController().sliderChangedEvent( getYearFromString(this.value()+'') );
	});
	
	$('#slider-box').hover(
		function(){ $('#hud').slideDown(300); },
		function(){ $('#hud').slideUp(300); }
	);
	$('#hud').hide();
}

var start = function(mainController){

	setUpGUI(mainController); // let there be light!
	mainController.canvasController().createRaphaelCanvas(); // create the canvas
	mainController.discoveryController().loadData(); // load the data --> create all the discovery views. 
	
}( function(){ // creates the main controller and passes it to start-up. No trace of it! 

	var obj = {},
		canvasController = CanvasController(),
		discoveryController = DiscoveryController( canvasController );

	obj.canvasController = function(){ 
		return canvasController; 
	};

	obj.discoveryController = function(){ 
		return discoveryController; 
	};

	// events
	obj.zoomOutEvent = function() {
	 	canvasController.canvas().setYearsPrScreen( canvasController.canvas().yearsPrScreen() + 10);
	};

	obj.zoomInEvent = function() {
		canvasController.canvas().setYearsPrScreen( canvasController.canvas().yearsPrScreen() - 10);
	};

	obj.zoomFullEvent = function() {
		canvasController.canvas()
			.setminYear(0)
			.setmaxYear(2009)
			.setYearsPrScreen( 2009 );
	};

	return obj;	
	}());		
}); // dom ready