var drawingHelper = function(){
	var obj = {};
	
	obj.yOffsetOfElementInCanvas = function(element, canvas){

		var magin = 5, // so it won't get cut off at the op & bottom
			gridSize = (canvas.height())/3; // height of each 'line'
		
		if ( element.isExperimental == "true" ) { return Math.random()*gridSize+gridSize*2-magin; }
		else if (element.field == "Technology") { return Math.random()*gridSize+gridSize;  }
		else { return Math.random()*gridSize + magin; }
	};
	
	
	obj.getColourFor = function(element){		
		if ( element.isExperimental == "true" ) { return "#53889C"; } // blue
		else if (element.field == "Technology") { return "#981422"; } // red
		else { return "#4CBF2F"; } // green
	};
	
	obj.createPathStringFromTo = function(fromDiscoveryGraphics, toDiscoveryGraphics){
		return	"M" + fromDiscoveryGraphics.xOffset() + 
				" " + fromDiscoveryGraphics.yOffset() + 
				"L" + toDiscoveryGraphics.xOffset() + 
				" " + toDiscoveryGraphics.yOffset();	
	};
	
	return obj;
	
}();


$(document).ready(function(){ // this is executed when the DOM is ready 

function gui(){

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
					rect: '0 0 800 500', 
					anchors: 'left top right bottom',
					style: { background: '#000'},
					id: 'paper'
				},
				{	
					view: 'Box', 
					rect: '0 500 800 100', 
					anchors: 'bottom right left',
					id: 'slider-box',
					style: { background: 'url(images/black.png) top left', borderTop: '2px solid #fff', borderBottom: '2px solid #fff'}
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
					{ // IMAGES
						view: 'Label',
						rect: '10 0 20 35',
						anchors: 'top right',
						html: "Scientists",
						style: { fontWeight: 'bold', fontFamily: 'Helvetica', fontSize: '20px'}
					},
					{ 
						view: 'Box', 
						rect: '10 30 180 280',
						anchors: 'top right',
						style: { overflow: 'hidden'},
						id: 'images'
					},
					{ // STATS
						view: 'Label',
						rect: '10 320 20 35',
						anchors: 'top right',
						html: "Stats for timespan",
						style: { fontWeight: 'bold', fontFamily: 'Helvetica', fontSize: '20px'}
					},
					{
						view: 'Label', 
						rect: '10 350 180 15',
						anchors: 'top right',
						html: 'From <span id="minYear">0</span> to <span id="maxYear">60</span>'
					},
					{
						view: 'Label', 
						rect: '10 380 180 15',
						anchors: 'top right',
						html: 'Technologies: <span id="techonologies_counter"></span>'
					},
					{
						view: 'Label', 
						rect: '10 400 180 15',
						anchors: 'top right',
						html: 'Theoretical: <span id="theoretical_counter"></span>'
					},
					{
						view: 'Label', 
						rect: '10 420 180 15',
						anchors: 'top right',
						html: 'Experiments: <span id="experiments_counter"></span>'
					},	
					{	view: 'Button', 
						rect: '5 575 20 20', 
						anchors: 'left bottom', 
						text: '+',
						id: 'zoomin_btn'						
					},
					{	view: 'Button', 
						rect: '30 575 20 20', 
						anchors: 'left bottom', 
						text: '-',
						id: 'zoomout_btn'						
					}
				]};

		obj.view = function(){ return view; };

		return obj; 
	};
	
	$(document).trigger('guiLoaded');
	
	$(document).bind('scopeChanged', function(event,data) {
		$('span#minYear').text(Math.ceil(data.min));
		$('span#maxYear').text(Math.ceil(data.max));
	});
	
	
	$('#images').bind('imagesLoaded',function(e,eventData){
		var data = [],
			row = 0, column = 0, maxColumns = 4, maxRows = 6, rowHeight = 40, columnWidth = 40, margin = 5,
		 	imgar = $.map(eventData.images,function(n){
				if (n.imageUrl !== "" && row < 6) {
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

		$.each(imgar,function(i,n){
			uki("Box[id^=images]").append(uki(n));
		});
		uki("Box[id^=images]").layout();
		
		$('#images img').hover(
				function(){
					var img = $(this);
					img.animate({'opacity':0.5,'border-color':'green'},300);
				},
				function(){
					var img = $(this);
					img.animate({'opacity':1,'border-color':'black'},300);
				})
			.bind('click',function(){
				var img = $(this);
				$.get('/json/markup/scientist/'+data[img.attr('src')].name, function(data){
					eval(data);
					$.facebox(createMarkup());
				});
			});
		
		
	});

	$(window)
		.resize(function(){
			var imagesContainer = $('#images'),
				images = imagesContainer.find('img');

			function imagesTotaltHeight(){
				return images.filter(':visible').size()/3*55;
			}
			function isOverflowing(){
				return ( imagesContainer.height() > imagesTotaltHeight()) ? false : true ;
			};
			function canAddAnotherRow(){
				return ( imagesContainer.height() > imagesTotaltHeight()+55) ? true : false ;
			}
			function thereAreMoreImages(){
				return ( imagesContainer.find('img:hidden') >= 3 ) ? true : false ;
			}
			function showOverflowingRows(){ 
				var hiddenImages = imagesContainer.find('img:hidden');
				hiddenImages.slice(0,3).show();
				if (canAddAnotherRow() && thereAreMoreImages()) { showOverflowingRows(); }
			};
			function hideOverflowingRows(){ // recursive call
				var visibleImages = imagesContainer.find('img:visible');
				visibleImages.slice(visibleImages.size()-3,visibleImages.size()).hide();
				if (isOverflowing()) { hideOverflowingRows(); }
			};

			if (isOverflowing()) { hideOverflowingRows(); }
			if (canAddAnotherRow() ) { showOverflowingRows(); }
		})
		.resize(function(){
			$('#paper svg').height( $(window).height() - $('#slider-box').height()); 
			$('#paper svg').width( $(window).width() - $('#sidebar').width());
		});	
}


(function(){

	$(document).bind('guiLoaded',function(){
		// get data and create discoveries
		$.get('http://localhost:8080/json/discoveries', function(data){
		// $.get('http://86.58.184.137:9999/json/discoveries', function(data){
			var arr = eval(data),
				technologies = $.map(arr, function(n){ if(n.field == "Technology") {return n;} });
			$(document).trigger('discoveriesLoaded', {discoveries: arr, technologies: technologies});
		});
		// $.get('http://86.58.184.137:9999/json/scientists', function(data){
		$.get('http://localhost:8080/json/scientists', function(data) {
			var arr = eval(data);
			$('#images').trigger('imagesLoaded', { images: arr });
		});
	});

	gui();

}());


}); // dom ready