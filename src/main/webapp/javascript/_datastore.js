var createDatastore = function(){
	
	var obj = {},
		discoveries = [],
		min = 0,
		max = 0;
	
	obj.isInInterval = function(min, max, value){
		return (value < max && value > min);
	};
	
	obj.findExperimentsInTimespan = function(from,to){
		
		return $.grep(discoveries,function(element) {
			return ( element.field == "Experiment" && obj.isInInterval(from, to, element.year));
		});
		
	};
	obj.findExperimentsInScope = function(){
		return obj.findExperimentsInTimespan(min, max);
	};
	
	obj.findTechnologiesInTimespan = function(from,to){
		
		return $.grep(discoveries,function(element) {
			return ( element.field == "Technology" && obj.isInInterval(from, to, element.year));
		});
		
	};
	obj.findTechnologiesInScope = function(){
		return obj.findTechnologiesInTimespan(min,max);
	};
	
	obj.findTheoreticalDiscoveriesInTimespan = function(from,to){
		return $.grep(discoveries,function(element) {
			return ( element.field == "Theory" && obj.isInInterval(from, to, element.year));
		});
	};
	obj.findTheoreticalDiscoveriesInScope = function(){
		return obj.findTheoreticalDiscoveriesInTimespan(min,max);
	};
	
	obj.findDiscoveryById = function( theId ){
		return $.grep(discoveries,function(element) {
			return (element.id == theId);
		});
	};
	
	$(document).bind('discoveriesLoaded', function(event,data){
		discoveries = data.discoveries;	
	});
	
	$(document).bind('scopeChanged', function(event,data){
		min = data.min;
		max = data.max;
	});
	
	return obj; 
};
var datastore = createDatastore();