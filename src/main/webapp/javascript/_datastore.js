var createDatastore = function(){
	
	var obj = {},
		discoveries = [];
	
	var isInInterval = function(min, max, value){
		return (value < max && value > min);
	};
	
	var genericFind = function( filterFunction ){
		return $.map(discoveries, function(element){
			if (filterFunction( element )) {
				return element;
			}
		});
	};
	
	obj.findExperimentsInTimespan = function(from,to){
		
		return genericFind( function(element) {
			if ( element.isExperimental && isInInterval(year, from, to)) {
				return true;
			} else {
				return false;
			} 
		});
		
	};
	
	obj.findTechnologiesInTimespan = function(from,to){
		
		return genericFind( function(element) {
			
			
			
		});
		
	};
	
	obj.findTheoreticalDiscoveriesInTimespan = function(from,to){
		
	};
	
	$(document).bind('disocveriesLoaded', function(event,data) {
		
		discoveries = data.discoveries.concat(data.technologies);
		
		
	});
	
	
	return obj; 
};


var datastore = createDatastore();