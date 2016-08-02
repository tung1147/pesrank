
angular.module('common')

.controller('ModalConfirmCtrl', ModalConfirmCtrl);



function ModalConfirmCtrl($scope, data, $uibModalInstance) {
	$scope.title = data.title;
	$scope.body = data.body;
	$scope.ok = function (reason) {
    reason  = reason || 'ok';
    $uibModalInstance.close(reason);
  };
  $scope.cancel = function (reason) {
    reason  = reason || 'cancel';
    $uibModalInstance.dismiss(reason);
  };
}