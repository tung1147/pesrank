angular.module('common')

.controller('ModalInvitationCtrl', ModalInvitationCtrl);




function ModalInvitationCtrl($scope, data, $uibModalInstance, settings) {
	$scope.data = data;
	$scope.disableInvitation = false;
	$scope.onDisableInvitation = function() {
		disableInvitation = $scope.disableInvitation;
	}
	$scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.onDisableInvitation = function() {
  	settings.disableInvitation = $scope.disableInvitation;
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
} 