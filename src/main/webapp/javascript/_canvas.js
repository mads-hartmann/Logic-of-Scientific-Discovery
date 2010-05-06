// -------------------------------------------------------
// The canvas
// display the graph
// -------------------------------------------------------
// @globals: drawingHelper -> defined in timeline.js

(function(){
	
	var width = 0,
		height = 0,
		yearsPrScreen = 60,
		minYear = -400,
		maxYear = minYear + yearsPrScreen,
		absoluteMin = -400,
		absoluteMax = 2009,
		discoveryGraphics = [],
		raphaelCanvas = null;
	
	var findGraphicsForModels = function(models) {
		
		return $.grep(discoveryGraphics, function(e){
			if (e !== undefined) {
				return ($.inArray( e.model(), models) != -1 );
			}
		});
		
	};
		
	// creates the canvas	
	var createCanvas = function() {
		
		
		var centerCanvasAt = function( year, forceIt ){
			
			var doAnimate = (forceIt || year > maxYear+10 || year < minYear-10) ? true  : false ;
						
			if (year+yearsPrScreen/2 > absoluteMax) { 
				minYear = 2009 - yearsPrScreen;
				maxYear = absoluteMax; 
			} else if ( year-yearsPrScreen/2 < absoluteMin) { 
				minYear = absoluteMin; 
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
			
			$('#paper').bind('centerCanvasAt', function(event,data) {
				$.facebox.close();
				centerCanvasAt(parseInt(data.year), data.forceIt);
			});
			
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
					// var clickedYear = calculateYearFromXCoordinate(event.clientX );
					// 
					// 					minYear = clickedYear - yearsPrScreen/2;	
					// 					maxYear = clickedYear + yearsPrScreen/2;
					// 					yearsPrScreen = yearsPrScreen-10;
					// 
					// 					$(document).trigger('zoomChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
					// 					$(document).trigger('scopeChanged', { min: minYear, max: maxYear, yearsPrScreen: yearsPrScreen});
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
		}());
		
		
		(function() { // add the events
			var onMouseClick = function(event) {
				$.get("/json/markup/discovery/"+modelDiscovery.id, function(data){
					eval(data);
					$.facebox(createMarkup());
				});
				event.stopPropagation();
			};

			var onDoubleClick = function(event) {
				event.stopPropagation(); // prevents the canvas from zooming
			};

			var onMouseOver = function(event){
				raphaelGraphics.animate({
					'stroke-width': 5,
					'scala': 2,
					'opacity': 0.9
				},100);
			};

			var onMouseOut = function(event){
				raphaelGraphics.animate({
					'stroke-width': 2,
					'scale': 1,
					'opacity': 0.5
				},100);
			};
			
			$(raphaelGraphics.node)
				.bind('click',function(event){ onMouseClick(event); })
				.bind('mouseover',function(event){ onMouseOver(event); })
				.bind('mouseout',function(event){ onMouseOut(event); })
				.bind('dblclick', function(event){ onDoubleClick(event); })
				.css({'cursor':'pointer'});
			
			$('#technology_label').hover(function() {
				if ( modelDiscovery.field == "Technology") {
					$(raphaelGraphics.node).trigger('mouseover');
				}
			},function() {
				if ( modelDiscovery.field == "Technology") {
					$(raphaelGraphics.node).trigger('mouseout');
				}
			});
			
			$('#experiments_label').hover(function() {
				if ( modelDiscovery.field == "Experiment") {
					$(raphaelGraphics.node).trigger('mouseover');
				}
			},function() {
				if ( modelDiscovery.field == "Experiment") {
					$(raphaelGraphics.node).trigger('mouseout');
				}
			});
			
			$('#theory_label').hover(function() {
				if ( modelDiscovery.field == "Theory") {
					$(raphaelGraphics.node).trigger('mouseover');
				}
			},function() {
				if ( modelDiscovery.field == "Theory") {
					$(raphaelGraphics.node).trigger('mouseout');
				}
			});
			
		}());
		
		obj.model = function(){
			return modelDiscovery;
		};
		
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
			
			var lines = $.map(modelDiscovery.dependencies, function(dependencyObj){
						var dependencyGraphic = discoveryGraphics[dependencyObj.id],
								pathString = drawingHelper.createPathStringFromTo(obj, dependencyGraphic),
								line = raphaelCanvas.path(pathString).attr({'stroke':'#fff', 'stroke-width':3,"opacity" : 0.4});
						$(line.node)
							.hover(function() {
								line.attr({'stroke':'#fff', 'stroke-width':4,"opacity" : 1.0});
							},function() {
								line.attr({'stroke':'#fff', 'stroke-width':3,"opacity" : 0.4});
							})
							.bind('click',function() {
								$.facebox('<p>' + dependencyObj.comment + '</p>');
							});
						return 	{
							'line' : line,
							'dependencyGraphics' : dependencyGraphic
						};
				});
			dependencyLines = lines || []; 
		};

		return obj;
	};
	
	$(document).bind('discoveriesLoaded',function(event,data){
		var arr = data.discoveries;

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