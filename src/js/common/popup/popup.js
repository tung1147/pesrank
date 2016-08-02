/**
 * @ngdoc service
 * @name common.popup
 * @requires $uibModal
 * @requires $uibModalInstance
 * @requires $scope
 *
 * @example
 *
 * 
 * ```js
 * angular('myModule', ['common'])
 * .controller('myController', function(popup) {
 *
 * 
 *   popup.alert('title', 'content').then(function() {
 *     // xu ly sau khi tat popup
 *   });
 *
 *   popup.confirm('title', 'content').then(function() {
 *     // xy ly khi bam nut ok
 *   })
 *   .catch(function() {
 *     // xy ly khi ban nut cancel
 *   })
 *
 *   // hien thi form dang nhap
 *   popup.login();
 *
 *   //hien thi form dang ky
 *   popup.register();
 *   
 * })
 * ```
 */


angular.module('common')


/**
 * @ngInject
 */
.directive('popup', function($timeout, popup) {
	return {
    restrict: 'A',
    scope: {
      popup: '@',
      popupSettings: "="
    },
    link: function(scope, element, attrs) {
    	element.unbind("click").bind("click", function ($event) {
    		$event.preventDefault();
    		$timeout(function() {
    			var settings = scope.popupSettings || {};
    			settings.title = scope.popupTitle;
    			popup.open(scope.popup, settings);
    		});

    	});
    }
  }
})	


/**
 * @ngInject
 */
.directive('confirm', function($timeout, popup) {
	return {
    priority: 1,
    restrict: 'A',
    scope: {
      confirmIf: "=",
      ngClick: '&',
      confirm: '@',
      confirmTitle: '@',
      confirmOk: '@',
      confirmCancel: '@'
    },
    link: function(scope, element, attrs) {
    	function onSuccess() {
        var rawEl = element[0];
        if (["checkbox", "radio"].indexOf(rawEl.type) != -1) {
          var model = element.data('$ngModelController');
          if (model) {
            model.$setViewValue(!rawEl.checked);
            model.$render();
          } else {
            rawEl.checked = !rawEl.checked;
          }
        }
        scope.ngClick();
      }

      element.unbind("click").bind("click", function ($event) {
        $event.preventDefault();
        $timeout(function() {
          if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {
          	var result = popup.confirm(scope.confirmTitle, scope.confirm).then(onSuccess);
            if (scope.confirmOk) {
              result.then(scope.confirmOk);
            }
            if (scope.confirmCancel) {
              result.catch(scope.confirmCancel);
            }
          } else {
            scope.$apply(onSuccess);
          }
        });
      });
    }
  }
})	


/**
 * @ngInject
 */
.service('popup', function ($uibModal, $rootScope) {


		function ucwords (str) {
			return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
				return $1.toUpperCase();
			});
		}

		// Create the templateUrl for a route to our resource that does the specified operation.
		var templateUrl = function(resourceName) {
			return 'common/modal/' + resourceName + '/' + resourceName.toLowerCase() + '.html';
		};

		// Create the controller name for a route to our resource that does the specified operation.
		var controllerName = function(resourceName) {
			return 'Modal'+ ucwords(resourceName) +'Ctrl';
		};

		/**
		 * @method removeAll
		 * 
		 * @return (void)
		 */
		this.removeAll = function() {
			if(angular.element('.modal').length > 0) {
				angular.forEach(angular.element('.modal'), function(modal) {
					angular.element(modal).scope().cancel('remove');
				})
			}
		}


		/**
		 * @method open2
		 * @param  {String} resourceName
		 * @param  {Object} options
		 * @return {$uibModal}
		 */
		this.open = function(resourceName, options, fn1, fn2) {
			options = angular.extend({
				title: "",
				body: "",
				animation: true,
				templateUrl: templateUrl(resourceName),
				controller: controllerName(resourceName),
				windowClass: "modal-game",
				backdrop: false,
			}, options);

			if(!options.resolve) {
				options.resolve = {
					data: {
						title: options.title,
						body: options.body,
					}
				}
			}
			delete options.title;
			delete options.body;
			var result =  $uibModal.open(options).result;

			if(angular.isFunction(fn1)) {
				result.then(fn1);
			}
			if(angular.isFunction(fn2)) {
				result.catch(fn2);
			}

			return result;
		}



		/*
		 * @method mini
		 * 
		 * @param {String} content
		 */
		this.mini = function (content) {
				if($rootScope.popupData) clearTimeout($rootScope.popupData.timeOut);
				$rootScope.popupData = {
						content: content,
						show: true,
						timeOut: setTimeout(function () {
								if ($rootScope.popupData) {
										$rootScope.popupData.show = false;
										$rootScope.digest();
								}
						}, 3000)
				};
				$rootScope.digest();
		};


		/**
		 * [login description]
		 * @return {$uibModal} [description]
		 */
		this.login = function (size) {
			return this.open('login');
		}

		/**
		 * [register description]
		 * @return {$uibModal} [description]
		 */
		this.register = function (size) {
			return this.open('register');
		}

		/**
		 * [profile description]
		 * @return {$uibModal} [description]
		 */
		this.profile = function (options) {
			options = options || {};
			var size = options.size  || 'lg';
			delete options.size;
			return this.open('profile', {
				size: size,
				resolve: {
					options: options
				}
			});
		}


		/**
		 * [profile description]
		 * @return {$uibModal}
		 */
		this.invitation = function (data, size) {
			return this.open('invitation', {
				size: size,
				resolve: {
					data: data
				}
			});
		}


		/**
		 * @method confirm
		 * 
		 * @param  {String}   title
		 * @param  {String}   body
		 * @param  {Function} fn
		 * @param  {Function}   fn1
		 * 
		 * @return {$uibModal}
		 */
		this.confirm = function (title, body, fn1, fn2) {
			return this.open('confirm', {
				title: title,
				body: body
			}, fn1, fn2); 
		}

		/**
		 * @method confirm
		 * 
		 * @param  {String}   title
		 * @param  {String}   body
		 * 
		 * @return {$uibModal}
		 */
		this.alert = function (title, body) {
			return this.open('alert', {
				title: title,
				body: body
			});
		}
});

 