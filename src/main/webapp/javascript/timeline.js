var drawingHelper = function(){
	var obj = {};
	
	obj.yOffsetOfElementInCanvas = function(element, canvas){

		var margin = 5, // so it won't get cut off at the op & bottom
			gridSize = ((canvas.height())/3)-2*margin; // height of each 'line'
		
		if ( element.field == "Experiment" ) { return Math.random()*gridSize+gridSize*2-margin; }
		else if (element.field == "Technology") { return Math.random()*gridSize+gridSize;  }
		else if (element.field == "Theory") { return Math.random()*gridSize + margin; }
		else { return Math.random()*(gridSize*3-margin)-margin ;}
	};
	
	
	obj.getColourFor = function(element){		
		if ( element.field == "Experiment" ) {  return "#53889C"; }
		else if (element.field == "Technology") { return "#981422";  }
		else if (element.field == "Theory") { return "#4CBF2F"; }
		else { return "#ffffff"; }
	};
	
	obj.createPathStringFromTo = function(fromDiscoveryGraphics, toDiscoveryGraphics){
		return	"M" + fromDiscoveryGraphics.xOffset() + 
				" " + fromDiscoveryGraphics.yOffset() + 
				"L" + toDiscoveryGraphics.xOffset() + 
				" " + toDiscoveryGraphics.yOffset();	
	};
	
	return obj;
	
}();

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
						rect: '10 30 190 280',
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
					{ 	view: 'Box',  // Techonologies 
						name: 'labelBox',
						rect: '5 380 180 20', 
						anchors: 'top right', 
						childViews: [
						{
							view: 'Label', 
							rect: '5 0 180 20',
							anchors: 'top right',
							id: 'technology_label',
							html: 'Technologies: <span id="techonologies_counter"></span>'
						}
					]}
					,
					{ 	view: 'Box',  // Theoretical 
						name: 'labelBox',
						rect: '5 405 180 20', 
						anchors: 'top right', 
						childViews: [
						{
							view: 'Label', 
							rect: '5 0 180 20',
							anchors: 'top right',
							id: 'theory_label',
							html: 'Theoretical: <span id="theoretical_counter"></span>'
						}]
					},
					{ 	view: 'Box',  // Theoretical 
						name: 'labelBox',
						rect: '5 430 180 20', 
						anchors: 'top right', 
						childViews: [
				 		{
				 	        view: 'Label', 
				 	        rect: '5 0 180 20',
				 	        anchors: 'top right',
				 	        id: 'experiments_label',
				 	        html: 'Experiments: <span id="experiments_counter"></span>'
				 		}]
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
	
	uki('Box[name="labelBox"]').bind('mouseover', function() { 
		uki(this).style({
			'-webkit-border-radius': '5px',
			'text-shadow' : '1px 1px 1px #000',
			color: '#fff',
			backgroundColor: '#777'
		});
	});
	uki('Box[name="labelBox"]').bind('mouseout', function() { 
		uki(this).style({
			'text-shadow' : 'none',
			color: '#000',
			backgroundColor: '#DCDCDC'
		});
	});
	
	
	
	(function() {
		var minYear = $('span#minYear'),
			maxYear = $('span#maxYear'),
			experiments_counter = $('span#experiments_counter'),
			theoretical_counter = $('span#theoretical_counter'),
			techonologies_counter = $('span#techonologies_counter');
		
		
		
		$(document).bind('scopeChanged', function(event,data) {
			var experiments = datastore.findExperimentsInTimespan(Math.ceil(data.min),Math.ceil(data.max)).length,
				theoretical = datastore.findTheoreticalDiscoveriesInTimespan(Math.ceil(data.min),Math.ceil(data.max)).length,
				techonologies = datastore.findTechnologiesInTimespan(Math.ceil(data.min),Math.ceil(data.max)).length;
				
			minYear.text(Math.ceil(data.min));
			maxYear.text(Math.ceil(data.max));
			experiments_counter.text(experiments );
			theoretical_counter.text(theoretical );
			techonologies_counter.text(techonologies );
		});	
		
	}());
	
	(function(){ // handle the images
		
		var images = [];
		
		$('#images').bind('imagesLoaded',function(e,eventData){
			var data = [],
				row = 0, column = 0, maxColumns = 4, rowHeight = 40, columnWidth = 40, margin = 5,
			 	images = $.map(eventData.images,function(n){ // creating the image
					if (n.imageUrl !== "") {
						var view = function(){
							data[n.imageUrl] = n;
							return uki({
								view: 'Image', 
								rect: columnWidth*column+(column*margin)+' '+ ((rowHeight*row/1)+(row*margin/1)/1) +' '+rowHeight+' '+columnWidth, 
								anchors: 'left top',  
								style: { border: '1px solid black', position: 'static', 'float': 'left'},
								src: n.imageUrl,
								id: n.name.replace(" ","_")
							});
						}();
						column = (column >= maxColumns-1) ? function(){row+=1; return 0;}() : column+1;
						$(document).bind('scopeChanged',function(event, data){
							if ((n.birth >= data.min && n.birth <= data.max) || (n.death <= data.max && n.data >= data.max) ) {
								view.style({ display: 'block'});
							} else {
								view.style({ display: 'none'});
							}
						});
						return {
							data: n,
							view: view
						};
					}
				});

			$.each(images,function(i,n){
				uki("Box[id^=images]").append(n.view);
			});
			// $('#images img').css({'position':'static', 'float':'left'});
			uki("Box[id^=images]").layout();
			

			$('#images img')
				.hover(
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
			// $(document).bind('scopeChanged',function() {
			// 	var that = $(this),
			// 			sci = $.grep($.map(images, function(elem){ elem.data; }),function(data){
			// 					return (data.name == that.attr('id').replace("_"," "));
			// 				  });
			// 			console.log(sci); // @DEBUGGING
			// 			console.log(that); // @DEBUGGING
					// if(datastore.isInInterval(sci.birth) && datastore.isInInterval(sci.death)){
					// 	that.show();
					// } else {
					// 	that.hide();
					// }
			// 	});	
		});
	}());
	
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
	
	$(document).ready(function() {
		$(document).bind('guiLoaded',function(){
			// get data and create discoveries
			$.get('http://localhost:8080/json/discoveries', function(data){
			// $.get('http://86.58.184.137:9999/json/discoveries', function(data){
				var arr = eval(data),
					technologies = $.map(arr, function(n){ if(n.field == "Technology") {return n;} });
				$(document).trigger('discoveriesLoaded', {discoveries: arr});
			});
			// $.get('http://86.58.184.137:9999/json/scientists', function(data){
			$.get('http://localhost:8080/json/scientists', function(data) {
				var arr = eval(data);
				$('#images').trigger('imagesLoaded', { images: arr });
			});
		});

		gui();
	});
}());