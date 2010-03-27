// -------------------------------------------------------
// The canvas
// display the graph
// -------------------------------------------------------
// @globals: drawingHelper -> defined in timeline.js

(function(){
	
	var width = 0,
		height = 0,
		yearsPrScreen = 60,
		minYear = 0,
		maxYear = minYear + yearsPrScreen,
		discoveryGraphics = [],
		raphaelCanvas = null;
		
	// creates the canvas	
	var createCanvas = function() {
		
		var centerCanvasAt = function( year ){
			
			var doAnimate = (year > maxYear+10 || year < minYear-10) ? true  : false ;
			
			if (year+yearsPrScreen/2 > 2009) { 
				minYear = 2009 - yearsPrScreen;
				maxYear = 2009; //@TODO absolute max year is hard-coded here
			} else if ( year-yearsPrScreen/2 < 0) { 
				minYear = 0; //@TODO absolute min year is hard-coded here
				maxYear = yearsPrScreen;
			} else {
				minYear = year - yearsPrScreen/2;	
				maxYear = year + yearsPrScreen/2;
			}
			$(document).trigger('scopeChanged', { 
				min: minYear, 
				max: maxYear, 
				yearsPrScreen: yearsPrScreen, 
				doAnimate: doAnimate
			});
		};
		
		var calculateYearFromXCoordinate = function( xCoordinate ){
			var pixelsPrYear = width / yearsPrScreen;
			return Math.round(xCoordinate / pixelsPrYear) + minYear;
		};
		
		var zoomIn = function(){
			yearsPrScreen = yearsPrScreen - 10;
			maxYear = maxYear - 10; 
			$(document).trigger('zoomChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
		};
		
		var zoomOut = function(){
			yearsPrScreen = yearsPrScreen + 10;
			maxYear = maxYear + 10; 
			$(document).trigger('zoomChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
		};
		
		$(document).bind('guiLoaded',function(){ // initialize & bind events

			(function(){ // gui is loaded, initialize
				width = $('#paper').width();
				height = $('#paper').height();
				raphaelCanvas = Raphael('paper',width,height);
			}());

			
			$('#zoomout_btn').bind('click',function(){ zoomOut(); });
			$('#zoomin_btn').bind('click',function(){ zoomIn(); });

			// user-generated events of the canvas
			$('#paper') 
				.bind('mousedown', function( event ){ // pressed, now move oppisite direction of mouse
					var clickedYear = calculateYearFromXCoordinate( event.clientX );
					$('#paper').mousemove( function( event ){	
						var pixelsPrYear = width / yearsPrScreen,
							year = Math.round( event.clientX / pixelsPrYear) + minYear,
							delta = clickedYear - year;
							newCenter = delta + (minYear + yearsPrScreen/2);						
						centerCanvasAt( newCenter );
					});
				})
				.bind('mouseup', function(){
					$('#paper').unbind('mousemove');
				})
				.bind('dblclick', function( event ){
					var clickedYear = calculateYearFromXCoordinate(event.clientX );

					minYear = clickedYear - yearsPrScreen/2;	
					maxYear = clickedYear + yearsPrScreen/2;
					yearsPrScreen = yearsPrScreen-10;

					$(document).trigger('zoomChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
					$(document).trigger('scopeChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
				});
		});

		$(document).bind('valueChanged',function(event,data) {
			centerCanvasAt( data.year );			
		});	
	}(); // no need to wait, just create the canvas
	
	// creates a discovery-view
	var createView = function( model ){

		var obj = {},
			modelDiscovery = model,
			raphaelGraphics = null,
			dependencyLines = null;
		
		var calculateXoffset = function(year){
			var yearWidth = width / yearsPrScreen,
				delta = year - minYear;
			return yearWidth*delta;
		};

		var calculateWidth = function() {
			return width / yearsPrScreen / 2; // it's the radius, not width. 
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
			raphaelGraphics.animate({
				'stroke-width': 5,
				'scala': 2,
				'opacity': 0.9
			},100);
		};

		function onMouseOut(event){
			raphaelGraphics.animate({
				'stroke-width': 2,
				'scale': 1,
				'opacity': 0.5
			},100);
		};
		
		(function(){ // draw the circle
			var y_offset = drawingHelper.yOffsetOfElementInCanvas(modelDiscovery, $('#paper')),
				x_offset = calculateXoffset(modelDiscovery.year);
			
			raphaelGraphics = raphaelCanvas
				.circle(x_offset, y_offset, calculateWidth())
				.attr({
					"fill": drawingHelper.getColourFor(modelDiscovery), 
					stroke: '#fff', 
					"stroke-width" : calculateWidth()/10, 
					"opacity" : 0.5 , 'scale':1
				});
				
			// bind events
			$(raphaelGraphics.node)
				.bind('click',function(event){ onMouseClick(event); })
				.bind('mouseover',function(event){ onMouseOver(event); })
				.bind('mouseout',function(event){ onMouseOut(event); })
				.bind('dblclick', function(event){ onDoubleClick(event); })
				.css({'cursor':'pointer'});
		}());
		
		obj.yOffset = function() {
			return raphaelGraphics.attrs.cy;
		};
	
		obj.xOffset = function() {
			return calculateXoffset(modelDiscovery.year);
		};
		
		$(document).bind('scopeChanged',function(event,data){
			var delta = calculateXoffset(modelDiscovery.year);
			
			
			
			if ( data.doAnimate ) {
				raphaelGraphics.animate({cx:delta}, 500);
			} else {
				raphaelGraphics.attr({cx:delta});
			}
			
			if (dependencyLines !== null) {	
				$.each(dependencyLines, function(index,object){
					if ( data.doAnimate ) {
						object.line.animate({path: drawingHelper.createPathStringFromTo(obj, object.dependencyGraphics)}, 500);
					} else {
						object.line.attr({path: drawingHelper.createPathStringFromTo(obj, object.dependencyGraphics)});
					}
					
				});
			}
		});

		$(document).bind('zoomChanged',function() {
			raphaelGraphics.animate({
					cx: calculateXoffset(modelDiscovery.year),
					r: calculateWidth()
				}, 500);

			if (dependencyLines !== null) {
				$.each(dependencyLines, function(index,object){
					object.line.animate({path: drawingHelper.createPathStringFromTo(obj, object.dependencyGraphics)}, 500);
				});
			} else { console.log("zoom, somehow was null"); };// @DEBUGGING}
		});
		
		obj.drawLines = function (){ //function to draw the lines 
			
			var lines = $.map(modelDiscovery.dependencies, function(dependencyId){
						var dependencyGraphic = discoveryGraphics[dependencyId];
							pathString = drawingHelper.createPathStringFromTo(obj, dependencyGraphic);
						return 	{
							'line' : raphaelCanvas.path(pathString).attr({'stroke':'#fff', 'stroke-width':2,"opacity" : 0.2}),
							'dependencyGraphics' : dependencyGraphic
						};
				});
			dependencyLines = lines || []; 
		};

		return obj;
	};
	
	$(document).bind('discoveriesLoaded',function(event,data){
		var arr = data.discoveries.concat(data.technologies);

		$.each(arr, function(index,element){
			var id = element.id;
			discoveryGraphics[id] = createView( element );
		}); 

		$.each(discoveryGraphics, function(index,element){			
			if (element != undefined) { 
				element.drawLines();
			}
		});

		
		$(document).trigger('zoomChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
		$(document).trigger('scopeChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
		
		// CREATE VIEW RETURNERER NOGLE GANGE UNDEFINED??? WHY???

	});
	
}());