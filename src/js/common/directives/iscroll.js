angular.module('common')
.directive('iscroll', function($interval) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
    	var refreshEnabled = true;
    	var refreshInterval = 100;
    	var refreshInterval;
    	var instance = new IScroll(element[0], {
  			mouseWheel: true, 
  			momentum: true, 
    	}); 

    	function _refreshInstance() {
        if (refreshEnabled) {
          //noinspection JSUnusedAssignment
          refreshEnabled = false;
          instance.refresh();
          refreshEnabled = true;
        }
      }


    	refreshInterval = $interval(_refreshInstance, refreshInterval);

    	instance.on('scrollStart', function (argument) {
    		refreshEnabled = false;
    	});

    	instance.on('scrollEnd', function(argument) {
    		refreshEnabled = true;
    	});

    	scope.$on('$destroy', function() {
    		$interval.cancel(refreshInterval);
    		instance.destroy();
    	});
    }
  }
})
 