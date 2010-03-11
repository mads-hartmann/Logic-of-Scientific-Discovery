$(document).ready(function(){ // this is executed when the DOM is ready 

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
			calculateWidth()).attr({"fill":"#4CBF2F", stroke: '#fff', "stroke-width" : calculateWidth()/10, "opacity" : 0.5 , 'scale':1});
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
		$.get("/json/markup/discovery/"+modelDiscovery.id, function(data){
			eval(data);
			$.facebox(createMarkup());
		});
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

function DiscoveryController( canvasController, ui ) {

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

	/* loads all of the data and feeds it to the UI through the UI object */ 
	obj.loadData = function(){
		// get data and create discoveries
		$.get('http://localhost:8080/json/discoveries', function(data){
		// $.get('http://86.58.184.137:9999/json/discoveries', function(data){
			var arr = eval(data),
				technologies = $.map(arr, function(n){ if(n.field == "Technology") {return n;} });
			$.each(arr, function(i,n){
				var id = arr[i].id;
				discoveries[id] = DiscoveryView(arr[i], obj, canvasController);
			});
			$.each(discoveries, function(i,n){
				console.log("calling draw lines"); // @DEBUGGING
				n.drawLines();
			});
		});
		// $.get('http://86.58.184.137:9999/json/scientists', function(data){
		$.get('http://localhost:8080/json/scientists', function(data) {
			var arr = eval(data);
			ui.addImages(arr);
			// console.log(data);
		});
	};

	return obj;
}

var UI = {};
UI.addImages = function(images){
	var data = [],
		row = 0, column = 0, maxColumns = 3, rowHeight = 55, columnWidth = 55, margin = 5,
	 	imgar = $.map(images,function(n){
			if (n.imageUrl !== "") {
				var view = function(){
					data[n.imageUrl] = n;
					return {
						view: 'Image', 
						rect: columnWidth*column+(column*margin)+' '+ ((rowHeight*row/1)+(row*margin/1)/1) +' '+rowHeight+' '+columnWidth, 
						anchors: 'left top',  
						style: { border: '3px solid black'},
						src: n.imageUrl,
						id: n.name.replace(" ","_")
					};
				}();
				column = (column >= maxColumns-1) ? function(){row+=1; return 0;}() : column+1 ;
				return view;
			}
		});
	uki({
		view: 'Box',
		rect: '0 0 0 190',
		anchors: 'top left right',
		childViews: imgar}
	).attachTo(document.getElementById('images'), '0 0');
	
	// events 
	$('#images img').hover(
		function(){
			var img = $(this);
			img.animate({'opacity':0.5,'border-color':'green'},300);
			console.log("over " + data[img.attr('src')].name); // @DEBUGGING
		},
		function(){
			var img = $(this);
			img.animate({'opacity':1,'border-color':'black'},300);
			console.log("over " + data[img.attr('src')].name); // @DEBUGGING
		}
	).bind('click',function(){
		var img = $(this);
		$.get('/json/markup/scientist/'+data[img.attr('src')].name, function(data){
			eval(data);
			$.facebox(createMarkup());
		});
	});
};

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
				id: 'sidebar',
				childViews:
				[ 
					{ // image box
						view: 'Box', 
						rect: '10 44 190 200',
						anchors: 'top left right',
						id: 'images'
					}, // search box
					{ 	view: 'TextField', 
						rect: '8 10 183 24', 
						placeholder: 'Search sources',
						multiline: true,
						textSelectable: true,
						anchors: 'top left right', 
						text: 'Clear text field',
						id: 'searchSources'
					},
					{	view: 'Button', 
						rect: '10 560 80 35', 
						anchors: 'left bottom', 
						text: 'Zoom in',
						id: 'zoomin_btn'						
					},
					{	view: 'Button', 
						rect: '100 560 80 35', 
						anchors: 'left bottom', 
						text: 'Zoom out',
						id: 'zoomout_btn'						
					}
				]};

		obj.view = function(){ return view; };
		
		return obj; 
	};

	// events 
	uki('#zoomout_btn').bind('click',function(){ mainController.zoomOutEvent(); });
	uki('#zoomin_btn').bind('click',function(){ mainController.zoomInEvent(); });
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
		discoveryController = DiscoveryController( canvasController, UI );

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

	return obj;	
	}());		
}); // dom ready