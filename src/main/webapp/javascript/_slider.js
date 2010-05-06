// -------------------------------------------------------
// The slider
// displays a minified version of the entier graph. 
// -------------------------------------------------------
// @globals: drawingHelper -> defined in timeline.js

(function Slider(){
	
	var width = 0, // init when dom is ready
		height = 0,
		minYear = -400, 
		maxYear = 2010,
		phaseShift = 0, // init when dom is ready
		raphaelSlider = null,
		scopeRect = null; 
		

	function xOffsetOfYear(year){
		var pixelsWidthPrYear = width / (maxYear - minYear);
		return pixelsWidthPrYear * year + phaseShift
	}
	
	function yearOfXOffset(xoffset){
		var pixelsWidthPrYear = width / (maxYear - minYear),
				result = ((xoffset-phaseShift) / pixelsWidthPrYear);
		return result;
	}
	
	
	function createPathStringFromTo(fromDiscoveryGraphics, toDiscoveryGraphics){
		return	"M" + fromDiscoveryGraphics.attrs.cx + 
						" " + fromDiscoveryGraphics.attrs.cy + 
						"L" + toDiscoveryGraphics.attrs.cx + 
						" " + toDiscoveryGraphics.attrs.cy;	
	};
	
	function draw(data) {
		
		// create the discovery graphics
		var graphics = $.map(data.discoveries,function(elem){
			return {
				"discovery" : elem,
				"graphic" : raphaelSlider.circle( xOffsetOfYear(elem.year), drawingHelper.yOffsetOfElementInCanvas(elem, $('#slider-box')), 3).attr({
											"fill": drawingHelper.getColourFor(elem),
											"stroke" : '#fff', 
											"stroke-width" : 1
										})
			}
		});
		
		console.log(graphics); // @DEBUGGING
		
		// draw the lines between discoveries
		$.each(graphics, function(index,graphicObj) {
			
			// get the dependencies
			var dependencyGraphicsObjects = $.map(graphicObj.discovery.dependencies,function(dependencyObj){
				return $.grep(graphics, function(gra) {
					return gra.discovery.id == dependencyObj.id;
				});
			});
			
			$.each(dependencyGraphicsObjects, function(index,obj){
				raphaelSlider.path(createPathStringFromTo(graphicObj.graphic,obj.graphic)).attr({'stroke':'#fff', 'stroke-width':1,"opacity" : 1.0});
			});
		});
	}
	
	var createScopeRect = function(){
		
		(function() {
			$('body').append('<div id="scopeRect"></div>');
			$('#scopeRect').css({
				'position': 'absolute',
				'height' : height,
				'top' : $(document).height() - height,
				'background' : '#fff',
				'opacity' : 0.3,
				'z-index' : 9999
			});
		}());
		
		var scopeRect = $('#scopeRect');
		
		$(document).bind('zoomChanged', function(event,data) {

			(function() { // change the width of the scopeRect
				scopeRect.animate({
					'width' : xOffsetOfYear(data.max) - xOffsetOfYear(data.min)
				}, 500);
			}());	
		});
		
		$(document).bind('scopeChanged', function(event,data) {
			(function() { // move the scopeRect
				if (data.doAnimate) {
					scopeRect.animate({
						'left' : xOffsetOfYear(data.min)
					},500);
				} else {
					scopeRect.css({
						'left' : xOffsetOfYear(data.min)
					});
				}
			}());
		});
		
		$(window).resize(function() {
			var newtop = $(window).height() - height ;
			scopeRect.css({ 'top' : newtop});
		});
	};

	$(document).bind('guiLoaded',function(){
		
		(function() { // create canvas for slider 
			width = $('#slider-box').width();
			height = $('#slider-box').height();
			phaseShift = width / (maxYear - minYear) * 400;
			raphaelSlider = Raphael('slider-box', width, height);
		}());
		
		createScopeRect();
		
		// events for the slider
		$('#slider-box').bind('click',function(event) {			
			var year = yearOfXOffset(event.clientX);
			$(document).trigger('valueChanged', { year: year}); // calculates the value wrong 
		});
		
		
		
	});
	
	// whenever the data is loaded. 
	$(document).bind('discoveriesLoaded', function(event,data){
		draw(data);
	});
	
}());