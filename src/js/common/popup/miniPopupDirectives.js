angular
        .module('common')
        .directive('miniPopup', function () {
            return {
                scope: false,
                restrict: "AE",
                controller: miniPopupController,
                templateUrl: 'common/popup/miniPopup.html'
            }
        });

function miniPopupController($scope, $rootScope) {
    $scope.close = function () {
        if ($rootScope.popupData) {
            clearTimeout($rootScope.popupData.timeOut);
            $rootScope.popupData.show = false;
            $rootScope.digest();
        }
    }
}