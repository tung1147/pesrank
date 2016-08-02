angular.module('app')

.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $rootScope) {
  $scope.page = {
    title: "PESRANK"
  };
  
  $rootScope.digest =  function(){
      try {
          $rootScope.$digest();
      }catch(e){
          console.warn(e);
      }
  };   
  
} 