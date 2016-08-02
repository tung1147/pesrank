
angular.module('common')

.controller('ModalAlertCtrl', ModalAlertCtrl);



function ModalAlertCtrl($scope, data, $uibModalInstance) {
	$scope.title = data.title;
	$scope.body = data.body;
  $scope.cancel = function (reason) {
    reason  = reason || 'cancel';
    $uibModalInstance.dismiss(reason);
  };
}