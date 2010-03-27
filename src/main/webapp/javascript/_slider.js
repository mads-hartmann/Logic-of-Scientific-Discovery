// -------------------------------------------------------
// The slider
// displays a minified version of the entier graph. 
// -------------------------------------------------------
// @globals: drawingHelper -> defined in timeline.js

(function Slider(){
	
	var width = 0, // init when dom is ready
		height = 0,
		timespan = 2010,
		raphaelSlider = null,
		scopeRect = null; 
		

	function xOffsetOfYear(year){
		return width / timespan * year;
	};
	function yearOfXOffset(xoffset){
		var result = (xoffset / (width / timespan));
		return result;
	};
	
	function draw(data) {
		
		$.each(data.discoveries,function(index,elem){
			raphaelSlider.circle( xOffsetOfYear(elem.year), drawingHelper.yOffsetOfElementInCanvas(elem, $('#slider-box')), 3).attr({
				"fill": drawingHelper.getColourFor(elem),
				stroke: '#fff', 
				"stroke-width" : 1
			});
		});
	};
	
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