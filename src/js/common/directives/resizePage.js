angular.module('common')
.directive('resizePage', function() {



  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var nodeName = element[0].nodeName;
      var _autoFit = function () {
        var width = 1280,height = 720;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var wRatio = windowWidth / width;
        var hRatio = windowHeight / height;          
        var zoom = (wRatio > hRatio) ? hRatio : wRatio;
        zoom = zoom > 1 ? 1 : zoom;
        var left = (windowWidth - width * zoom) / 2;
        if(nodeName ==  'CANVAS'){
          element.css({"width": width * zoom, "height": height * zoom, left: left + "px"});
          return;
        }
        element.css({"zoom": zoom});
      };
      _autoFit();
      window.addEventListener("resize",_autoFit, true);
      scope.$on('$destroy', function() {
        window.removeEventListener("resize",_autoFit, true);
      })
    }
  }
})
 