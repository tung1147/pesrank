(function(){
"use strict";

angular.module("app", [
  'ui.router',
  "ui.bootstrap",
  'ngMaterial',
  'ngResource',
  'ngMessages',
  'satellizer',
  'angularMoment',
  'core',
  'common',
  'config',
  'templates'
]);
 
})();
(function(){
"use strict";

jQuery(document).ready(function() {
  window.angular.bootstrap(document, ['app']);
});
})();
(function(){
"use strict";

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
AppCtrl.$inject = ["$scope", "$rootScope"]; 
})();
(function(){
"use strict";

angular.module('templates', []); 
})();
(function(){
"use strict";

angular.module('common', [
]);
})();
(function(){
"use strict";

angular.module('config', []); 
})();
(function(){
"use strict";

angular.module("core", [
  'core.auth',
  'core.utils'
]);
})();
(function(){
"use strict";

angular.module('app')
/**
 * @ngInject
 */
.run(["popup", function(popup) {
  var disablePopupVerify = false;
  return;
  auth.$waitForAuth(function(user) {
    //popup verified
    if(!user.isVerified() && !disablePopupVerify && user.roomId ==0 && user.zoneId == 0) {
      popup.confirm("THÔNG BÁO", "Tài khoản của bạn chưa được xác thực. Vui lòng xác thực tài khoản để nhận ngay 4k vàng và chơi thỏa thích")
      .then(function() {
        popup.profile({
          defaultAction: "verify"
        });
      }).catch(function() {
        disablePopupVerify = true;
      });
    }
  })
}])
/**
 * @ngInject
 */
.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, popup ) {
    
}
HomeCtrl.$inject = ["$scope", "popup"];   
})();
(function(){
"use strict";

angular.module('common')
.directive('iscroll', ["$interval", function($interval) {
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
}])
 
})();
(function(){
"use strict";

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
 
})();
(function(){
"use strict";

angular.module('app')
        .filter('numberWithDot', function () {
            return function (number) {
                if (isNaN(number))
                    return 0;
                var parts = number.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return parts.join(".");
            }
        })

        .filter('goldWithDot', function () {

            return function (number) {
                if (isNaN(number)) {
                    return number;
                } else {
                    var displayNumber, character;
                    var numberAbs = Math.abs(number)
                    if (numberAbs >= 10000000) {
                        displayNumber = numberWithDot(numberAbs/1000000);
                        character = "M";
                    } else if (numberAbs >= 10000) {
                        displayNumber = numberWithDot(numberAbs);
                        character = "";
                    } else {
                        displayNumber = numberWithDot(numberAbs);
                        character = "";
                    }
                    if (number < 0) {
                        displayNumber = "-" + displayNumber;
                    }
                    return displayNumber + character;
                }
            }
        })

        .filter('goldWithDot2', ["$rootScope", function ($rootScope) {

            return function (number) {
                if (isNaN(number)) {
                    return number;
                } else {
                    var displayNumber, character;
                    var numberAbs = Math.abs(number)
                    if (numberAbs >= 100000000) {
                        displayNumber = Global.numberWithDot(Math.floor(numberAbs / 1000000));
                        character = "M";
                    } else if (numberAbs >= 100000) {
                        displayNumber = Global.numberWithDot(Math.floor(numberAbs / 1000));
                        character = "K";
                    } else {
                        displayNumber = Global.numberWithDot(numberAbs);
                        character = "";
                    }
                    if (number < 0) {
                        displayNumber = "-" + displayNumber;
                    }
                    return displayNumber + character;
                }
            }
        }])
        .filter('splitText', function () {
            return function (value) {
                return value.split(" ")[0];
            }
        })
        .filter('cardTL', ["$rootScope", function ($rootScope) {
            return function (cardValue) {
                if (cardValue < 44)
                    return cardValue + 8;
                return cardValue - 44;
            }
        }]);


function numberWithDot(x) {
    if (isNaN(x))
        return 0;
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}
;
})();
(function(){
"use strict";

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
miniPopupController.$inject = ["$scope", "$rootScope"];
})();
(function(){
"use strict";

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
.directive('popup', ["$timeout", "popup", function($timeout, popup) {
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
}])	


/**
 * @ngInject
 */
.directive('confirm', ["$timeout", "popup", function($timeout, popup) {
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
}])	


/**
 * @ngInject
 */
.service('popup', ["$uibModal", "$rootScope", function ($uibModal, $rootScope) {


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
}]);

 
})();
(function(){
"use strict";



angular.module('common')

/**
 * @ngInject
 */
.service('settings', ["$localStorage", function($localStorage) {

	/**
	 * @class Setting
	 */
	function Setting() {
		/**
		 * @protected
		 * @type {Object}
		 */
		this.settings = {
			volume: 1,
			invite: 1
		};

	  // save settings to local storage
	  if (!angular.isDefined($localStorage.settings) ) {
	    $localStorage.settings = this.settings;
	  }

	  return $localStorage.settings;
	}

	return new Setting();

}]);
})();
(function(){
"use strict";

angular.module('config')

/**
 * @ngInject
 */
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider,   $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/');
  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      templateUrl: 'web/app.html'
    })
    .state('app.home', {
      url: '/',
      templateUrl: 'web/home.html',
      controller: 'HomeCtrl'
    });
}]) 

/**
 * @ngInject
 */
.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);
})();
(function(){
"use strict";

/**
 * @ngdoc service
 * @name core.auth
 * @requires ngStorage
 *
 * @example
 *
 * 
 * ```js
 * angular('myModule', ['core'])
 * .controller('myController', function(AuthManager, User) {
 *
 *  var auth = new AuthManager();
 *
 *  User.login({username: 1, password:1})
 *  .then(function(res) {
 *    auth.login(res);
 *  })
 *  .catch(function(err) {
 *    auth.clearAll();
 *  });
 *
 *
 *  auth.logout();
 *
 *  auth.isRemeberMe();
 *
 *  auth.isAuthenticated();
 *   
 * })
 * ```
 */

angular.module('core.auth', ['ngStorage'])

/**
 * @ngInject
 */
.factory('AuthManager', ["$localStorage", "$sessionStorage", "$q", function($localStorage, $sessionStorage, $q) {
  AuthManager.prototype = angular.copy(EventEmitter.prototype);


  function Storage(prefix) {
    prefix = "AUTH:" + prefix;
    /**
     * @type {Style}
     */
    this.prefix = prefix;
    /**
     * Storage
     */
    this.save = function(data) {
      var storage = data.rememberMe ? $localStorage: $sessionStorage;
      storage[this.prefix] = data;
    }
    /**
     * Read
     */
    this.read = function() {
      return $localStorage[this.prefix] || $sessionStorage[this.prefix];
    }

    /**
     * Clear
     */
    this.clear = function() {
      $localStorage[this.prefix] = null;
      $sessionStorage[this.prefix] = null;
    }

  }


  /**
   * Auth manager
   * @property {User<Object>} user
   */
  function AuthManager(options) {
    this.user = null;
    this.options = options ? options : {};
    this.initialAuthResolve = $q.defer();
    this._storage = new Storage(this.options.prefix);
  }

  /**
   *  Is rememeber me
   */
  AuthManager.prototype.isRememberMe = function() {
    return (this.getStorage() && this.getStorage().rememberMe);
  }


  /**
   * Save current user login
   * @param  {User<Object>} data
   * @return {AuthManager<Object>}
   */
  AuthManager.prototype.save = function(data) {
    this._storage.save(data);
    return this;
  }


  AuthManager.prototype.disconnect = function() {
    this.user = null;
    this.initialAuthResolve = $q.defer();
  }

  AuthManager.prototype.getStorage = function() {
    return this._storage.read();
  }


  AuthManager.prototype.setPassword = function(newValue) {
    this.getStorage().password = newValue;
  }


  AuthManager.prototype.isAuthenticated= function(argument) {
    return !!this.user;
  }


  /**
   * [setUser description]
   * @param {[type]} data [description]
   */
  AuthManager.prototype.login = function(data) {
    this.user = data;
    return this.initialAuthResolve.resolve(data);
  }

  /**
   * Get user info
   *
   * @return {Object}
   */
  AuthManager.prototype.getUser = function() {
    return this.user;
  }


  /**
   * Logout
   *
   * @return {AuthManager<Object>}
   */
  AuthManager.prototype.logout = function() {
    if(this.isAuthenticated()) {
      this.user.logout();
    }
    this.initialAuthResolve = $q.defer();
    this.clearAll();
    return this;
  }


  /**
   * Clear current user
   */
  AuthManager.prototype.clearUser = function() {
    this.user = null;
  }


  /**
   * Clear data from storage
   * Clear user data
   */
  AuthManager.prototype.clearAll = function() {
    this._storage.clear();
    this.clearUser();
  }

  /**
   * Utility method which can be used in a route's resolve() method to grab the current
   * authentication data.
   *
   * @returns {Promise<Object|null>} A promise fulfilled with the client's current authentication
   * state, which will be null if the client is not authenticated.
   */
  AuthManager.prototype.$waitForAuth = function(cb) {
    this.initialAuthResolve.promise.then(cb);
  }

  
  /**
   * Utility method which can be used in a route's resolve() method to require that a route has
   * a logged in client.
   *
   * @returns {Promise<Object>} A promise fulfilled with the client's current authentication
   * state or rejected if the client is not authenticated.
   */
  AuthManager.prototype.requireAuth = function() {
    function reject(err) {
      var def = $q.defer();
      def.reject(err);
      return def.promise;
    }

    if(!this.getStorage()) {
      return reject('AUTH_REQUIRED');
    }

    return this.initialAuthResolve
    .promise
    .catch(function(err) {
      return reject('AUTH_REQUIRED');
    });
  }


  return AuthManager;
}])
})();
(function(){
"use strict";

angular.module('core.utils', [])
/**
 * @ngInject
 */
.service('utils', ["$q", function($q) {
  this.promise = function(cb) {
    var defer = $q.defer();
    cb(defer);
    return defer.promise;
  } 



  // http://stackoverflow.com/questions/7509831/alternative-for-the-deprecated-proto
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  this.inherit = function(ChildClass, ParentClass, methods) {
    var childMethods = ChildClass.prototype;
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass; // restoring proper constructor for child class
    angular.forEach(Object.keys(childMethods), function(k) {
      ChildClass.prototype[k] = childMethods[k];
    });
    if( angular.isObject(methods) ) {
      angular.extend(ChildClass.prototype, methods);
    }
    return ChildClass;
  }

}])
})();
(function(){
"use strict";


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
ModalAlertCtrl.$inject = ["$scope", "data", "$uibModalInstance"];
})();
(function(){
"use strict";


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
ModalConfirmCtrl.$inject = ["$scope", "data", "$uibModalInstance"];
})();
(function(){
"use strict";

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
ModalInvitationCtrl.$inject = ["$scope", "data", "$uibModalInstance", "settings"]; 
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJvb3RzdHJhcC5qcyIsIm1haW4uanMiLCJ0ZW1wbGF0ZXMuanMiLCJjb21tb24vY29tbW9uLmpzIiwiY29uZmlnL2luZGV4LmpzIiwiY29yZS9jb3JlLmpzIiwiYXBwL2hvbWUvaG9tZUNvbnRyb2xsZXIuanMiLCJjb21tb24vZGlyZWN0aXZlcy9pc2Nyb2xsLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvcmVzaXplUGFnZS5qcyIsImNvbW1vbi9maXRlcnMvbnVtYmVyV2l0aERvdC5qcyIsImNvbW1vbi9wb3B1cC9taW5pUG9wdXBEaXJlY3RpdmVzLmpzIiwiY29tbW9uL3BvcHVwL3BvcHVwLmpzIiwiY29tbW9uL3NlcnZpY2VzL3NldHRpbmdzLmpzIiwiY29uZmlnL2pzL3JvdXRlci5qcyIsImNvcmUvYXV0aC9hdXRoLmpzIiwiY29yZS91dGlscy91dGlsaXRpZXMuanMiLCJjb21tb24vbW9kYWwvYWxlcnQvYWxlcnQuanMiLCJjb21tb24vbW9kYWwvY29uZmlybS9jb25maXJtLmpzIiwiY29tbW9uL21vZGFsL2ludml0YXRpb24vaW52aXRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTztFQUNwQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztDQUVEOzs7OztBQ2JELE9BQU8sVUFBVSxNQUFNLFdBQVc7RUFDaEMsT0FBTyxRQUFRLFVBQVUsVUFBVSxDQUFDO0dBQ25DOzs7OztBQ0ZILFFBQVEsT0FBTzs7Q0FFZCxXQUFXLFdBQVc7OztBQUd2QixTQUFTLFFBQVEsUUFBUSxZQUFZO0VBQ25DLE9BQU8sT0FBTztJQUNaLE9BQU87OztFQUdULFdBQVcsVUFBVSxVQUFVO01BQzNCLElBQUk7VUFDQSxXQUFXO09BQ2QsTUFBTSxFQUFFO1VBQ0wsUUFBUSxLQUFLOzs7Ozs0Q0FJckI7Ozs7O0FDbEJGLFFBQVEsT0FBTyxhQUFhLEtBQUs7Ozs7O0FDQWpD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cEIsT0FBTyxPQUFPLEtBQUs7Q0FDbkIsT0FBTyxLQUFLLFVBQVUsUUFBUTtJQUMzQixVQUFVLFVBQVU7SUFDcEIsa0JBQWtCLE1BQU07O0VBRTFCLE9BQU8sU0FBUyxVQUFVLFFBQVE7SUFDaEMsVUFBVSxVQUFVO0lBQ3BCLGtCQUFrQixRQUFROzs7bUVBRTdCOzs7OztBQ2xCRCxRQUFRLE9BQU87O0NBRWQsV0FBVyx1QkFBdUI7Ozs7O0FBS25DLFNBQVMsb0JBQW9CLFFBQVEsTUFBTSxtQkFBbUIsVUFBVTtDQUN2RSxPQUFPLE9BQU87Q0FDZCxPQUFPLG9CQUFvQjtDQUMzQixPQUFPLHNCQUFzQixXQUFXO0VBQ3ZDLG9CQUFvQixPQUFPOztDQUU1QixPQUFPLEtBQUssWUFBWTtJQUNyQixrQkFBa0I7OztFQUdwQixPQUFPLHNCQUFzQixXQUFXO0dBQ3ZDLFNBQVMsb0JBQW9CLE9BQU87O0VBRXJDLE9BQU8sU0FBUyxZQUFZO0lBQzFCLGtCQUFrQixRQUFROzs7bUZBRTVCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKFwiYXBwXCIsIFtcclxuICAndWkucm91dGVyJyxcclxuICBcInVpLmJvb3RzdHJhcFwiLFxyXG4gICduZ01hdGVyaWFsJyxcclxuICAnbmdSZXNvdXJjZScsXHJcbiAgJ25nTWVzc2FnZXMnLFxyXG4gICdzYXRlbGxpemVyJyxcclxuICAnYW5ndWxhck1vbWVudCcsXHJcbiAgJ2NvcmUnLFxyXG4gICdjb21tb24nLFxyXG4gICdjb25maWcnLFxyXG4gICd0ZW1wbGF0ZXMnXHJcbl0pO1xyXG4gIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICB3aW5kb3cuYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnYXBwJ10pO1xyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuXHJcbi5jb250cm9sbGVyKCdBcHBDdHJsJywgQXBwQ3RybCk7XHJcblxyXG5cclxuZnVuY3Rpb24gQXBwQ3RybCgkc2NvcGUsICRyb290U2NvcGUpIHtcclxuICAkc2NvcGUucGFnZSA9IHtcclxuICAgIHRpdGxlOiBcIlBFU1JBTktcIlxyXG4gIH07XHJcbiAgXHJcbiAgJHJvb3RTY29wZS5kaWdlc3QgPSAgZnVuY3Rpb24oKXtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgICAgIH1cclxuICB9OyAgIFxyXG4gIFxyXG59ICIsImFuZ3VsYXIubW9kdWxlKCd0ZW1wbGF0ZXMnLCBbXSk7ICIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24nLCBbXHJcbl0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb25maWcnLCBbXSk7ICIsImFuZ3VsYXIubW9kdWxlKFwiY29yZVwiLCBbXHJcbiAgJ2NvcmUuYXV0aCcsXHJcbiAgJ2NvcmUudXRpbHMnXHJcbl0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4vKipcclxuICogQG5nSW5qZWN0XHJcbiAqL1xyXG4ucnVuKGZ1bmN0aW9uKHBvcHVwKSB7XHJcbiAgdmFyIGRpc2FibGVQb3B1cFZlcmlmeSA9IGZhbHNlO1xyXG4gIHJldHVybjtcclxuICBhdXRoLiR3YWl0Rm9yQXV0aChmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAvL3BvcHVwIHZlcmlmaWVkXHJcbiAgICBpZighdXNlci5pc1ZlcmlmaWVkKCkgJiYgIWRpc2FibGVQb3B1cFZlcmlmeSAmJiB1c2VyLnJvb21JZCA9PTAgJiYgdXNlci56b25lSWQgPT0gMCkge1xyXG4gICAgICBwb3B1cC5jb25maXJtKFwiVEjDlE5HIELDgU9cIiwgXCJUw6BpIGtob+G6o24gY+G7p2EgYuG6oW4gY2jGsGEgxJHGsOG7o2MgeMOhYyB0aOG7sWMuIFZ1aSBsw7JuZyB4w6FjIHRo4buxYyB0w6BpIGtob+G6o24gxJHhu4Mgbmjhuq1uIG5nYXkgNGsgdsOgbmcgdsOgIGNoxqFpIHRo4buPYSB0aMOtY2hcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcG9wdXAucHJvZmlsZSh7XHJcbiAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBcInZlcmlmeVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRpc2FibGVQb3B1cFZlcmlmeSA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbi5jb250cm9sbGVyKCdIb21lQ3RybCcsIEhvbWVDdHJsKTtcclxuXHJcbmZ1bmN0aW9uIEhvbWVDdHJsKCRzY29wZSwgcG9wdXAgKSB7XHJcbiAgICBcclxufSAgICIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24nKVxyXG4uZGlyZWN0aXZlKCdpc2Nyb2xsJywgZnVuY3Rpb24oJGludGVydmFsKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgIFx0dmFyIHJlZnJlc2hFbmFibGVkID0gdHJ1ZTtcclxuICAgIFx0dmFyIHJlZnJlc2hJbnRlcnZhbCA9IDEwMDtcclxuICAgIFx0dmFyIHJlZnJlc2hJbnRlcnZhbDtcclxuICAgIFx0dmFyIGluc3RhbmNlID0gbmV3IElTY3JvbGwoZWxlbWVudFswXSwge1xyXG4gIFx0XHRcdG1vdXNlV2hlZWw6IHRydWUsIFxyXG4gIFx0XHRcdG1vbWVudHVtOiB0cnVlLCBcclxuICAgIFx0fSk7IFxyXG5cclxuICAgIFx0ZnVuY3Rpb24gX3JlZnJlc2hJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAocmVmcmVzaEVuYWJsZWQpIHtcclxuICAgICAgICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxyXG4gICAgICAgICAgcmVmcmVzaEVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGluc3RhbmNlLnJlZnJlc2goKTtcclxuICAgICAgICAgIHJlZnJlc2hFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgXHRyZWZyZXNoSW50ZXJ2YWwgPSAkaW50ZXJ2YWwoX3JlZnJlc2hJbnN0YW5jZSwgcmVmcmVzaEludGVydmFsKTtcclxuXHJcbiAgICBcdGluc3RhbmNlLm9uKCdzY3JvbGxTdGFydCcsIGZ1bmN0aW9uIChhcmd1bWVudCkge1xyXG4gICAgXHRcdHJlZnJlc2hFbmFibGVkID0gZmFsc2U7XHJcbiAgICBcdH0pO1xyXG5cclxuICAgIFx0aW5zdGFuY2Uub24oJ3Njcm9sbEVuZCcsIGZ1bmN0aW9uKGFyZ3VtZW50KSB7XHJcbiAgICBcdFx0cmVmcmVzaEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgXHR9KTtcclxuXHJcbiAgICBcdHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgIFx0XHQkaW50ZXJ2YWwuY2FuY2VsKHJlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICBcdFx0aW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgXHR9KTtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiAiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uJylcclxuLmRpcmVjdGl2ZSgncmVzaXplUGFnZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgIHZhciBub2RlTmFtZSA9IGVsZW1lbnRbMF0ubm9kZU5hbWU7XHJcbiAgICAgIHZhciBfYXV0b0ZpdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSAxMjgwLGhlaWdodCA9IDcyMDtcclxuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHZhciB3UmF0aW8gPSB3aW5kb3dXaWR0aCAvIHdpZHRoO1xyXG4gICAgICAgIHZhciBoUmF0aW8gPSB3aW5kb3dIZWlnaHQgLyBoZWlnaHQ7ICAgICAgICAgIFxyXG4gICAgICAgIHZhciB6b29tID0gKHdSYXRpbyA+IGhSYXRpbykgPyBoUmF0aW8gOiB3UmF0aW87XHJcbiAgICAgICAgem9vbSA9IHpvb20gPiAxID8gMSA6IHpvb207XHJcbiAgICAgICAgdmFyIGxlZnQgPSAod2luZG93V2lkdGggLSB3aWR0aCAqIHpvb20pIC8gMjtcclxuICAgICAgICBpZihub2RlTmFtZSA9PSAgJ0NBTlZBUycpe1xyXG4gICAgICAgICAgZWxlbWVudC5jc3Moe1wid2lkdGhcIjogd2lkdGggKiB6b29tLCBcImhlaWdodFwiOiBoZWlnaHQgKiB6b29tLCBsZWZ0OiBsZWZ0ICsgXCJweFwifSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQuY3NzKHtcInpvb21cIjogem9vbX0pO1xyXG4gICAgICB9O1xyXG4gICAgICBfYXV0b0ZpdCgpO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLF9hdXRvRml0LCB0cnVlKTtcclxuICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsX2F1dG9GaXQsIHRydWUpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuICIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5maWx0ZXIoJ251bWJlcldpdGhEb3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obnVtYmVyKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IG51bWJlci50b1N0cmluZygpLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCIuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmZpbHRlcignZ29sZFdpdGhEb3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzcGxheU51bWJlciwgY2hhcmFjdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXJBYnMgPSBNYXRoLmFicyhudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlckFicyA+PSAxMDAwMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TnVtYmVyID0gbnVtYmVyV2l0aERvdChudW1iZXJBYnMvMTAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IFwiTVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtYmVyQWJzID49IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOdW1iZXIgPSBudW1iZXJXaXRoRG90KG51bWJlckFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU51bWJlciA9IG51bWJlcldpdGhEb3QobnVtYmVyQWJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlciA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU51bWJlciA9IFwiLVwiICsgZGlzcGxheU51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BsYXlOdW1iZXIgKyBjaGFyYWN0ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuZmlsdGVyKCdnb2xkV2l0aERvdDInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihudW1iZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlOdW1iZXIsIGNoYXJhY3RlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyQWJzID0gTWF0aC5hYnMobnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1iZXJBYnMgPj0gMTAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOdW1iZXIgPSBHbG9iYWwubnVtYmVyV2l0aERvdChNYXRoLmZsb29yKG51bWJlckFicyAvIDEwMDAwMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gXCJNXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChudW1iZXJBYnMgPj0gMTAwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOdW1iZXIgPSBHbG9iYWwubnVtYmVyV2l0aERvdChNYXRoLmZsb29yKG51bWJlckFicyAvIDEwMDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gXCJLXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU51bWJlciA9IEdsb2JhbC5udW1iZXJXaXRoRG90KG51bWJlckFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1iZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOdW1iZXIgPSBcIi1cIiArIGRpc3BsYXlOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXNwbGF5TnVtYmVyICsgY2hhcmFjdGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmlsdGVyKCdzcGxpdFRleHQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zcGxpdChcIiBcIilbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5maWx0ZXIoJ2NhcmRUTCcsIGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2FyZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FyZFZhbHVlIDwgNDQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmRWYWx1ZSArIDg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FyZFZhbHVlIC0gNDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5mdW5jdGlvbiBudW1iZXJXaXRoRG90KHgpIHtcclxuICAgIGlmIChpc05hTih4KSlcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciBwYXJ0cyA9IHgudG9TdHJpbmcoKS5zcGxpdChcIi5cIik7XHJcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLlwiKTtcclxuICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLlwiKTtcclxufVxyXG47IiwiYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2NvbW1vbicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnbWluaVBvcHVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6IFwiQUVcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IG1pbmlQb3B1cENvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbW1vbi9wb3B1cC9taW5pUG9wdXAuaHRtbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuZnVuY3Rpb24gbWluaVBvcHVwQ29udHJvbGxlcigkc2NvcGUsICRyb290U2NvcGUpIHtcclxuICAgICRzY29wZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHJvb3RTY29wZS5wb3B1cERhdGEpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCRyb290U2NvcGUucG9wdXBEYXRhLnRpbWVPdXQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnBvcHVwRGF0YS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuZGlnZXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEBuZ2RvYyBzZXJ2aWNlXHJcbiAqIEBuYW1lIGNvbW1vbi5wb3B1cFxyXG4gKiBAcmVxdWlyZXMgJHVpYk1vZGFsXHJcbiAqIEByZXF1aXJlcyAkdWliTW9kYWxJbnN0YW5jZVxyXG4gKiBAcmVxdWlyZXMgJHNjb3BlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqXHJcbiAqIFxyXG4gKiBgYGBqc1xyXG4gKiBhbmd1bGFyKCdteU1vZHVsZScsIFsnY29tbW9uJ10pXHJcbiAqIC5jb250cm9sbGVyKCdteUNvbnRyb2xsZXInLCBmdW5jdGlvbihwb3B1cCkge1xyXG4gKlxyXG4gKiBcclxuICogICBwb3B1cC5hbGVydCgndGl0bGUnLCAnY29udGVudCcpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAqICAgICAvLyB4dSBseSBzYXUga2hpIHRhdCBwb3B1cFxyXG4gKiAgIH0pO1xyXG4gKlxyXG4gKiAgIHBvcHVwLmNvbmZpcm0oJ3RpdGxlJywgJ2NvbnRlbnQnKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gKiAgICAgLy8geHkgbHkga2hpIGJhbSBudXQgb2tcclxuICogICB9KVxyXG4gKiAgIC5jYXRjaChmdW5jdGlvbigpIHtcclxuICogICAgIC8vIHh5IGx5IGtoaSBiYW4gbnV0IGNhbmNlbFxyXG4gKiAgIH0pXHJcbiAqXHJcbiAqICAgLy8gaGllbiB0aGkgZm9ybSBkYW5nIG5oYXBcclxuICogICBwb3B1cC5sb2dpbigpO1xyXG4gKlxyXG4gKiAgIC8vaGllbiB0aGkgZm9ybSBkYW5nIGt5XHJcbiAqICAgcG9wdXAucmVnaXN0ZXIoKTtcclxuICogICBcclxuICogfSlcclxuICogYGBgXHJcbiAqL1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbi5kaXJlY3RpdmUoJ3BvcHVwJywgZnVuY3Rpb24oJHRpbWVvdXQsIHBvcHVwKSB7XHJcblx0cmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBwb3B1cDogJ0AnLFxyXG4gICAgICBwb3B1cFNldHRpbmdzOiBcIj1cIlxyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgXHRlbGVtZW50LnVuYmluZChcImNsaWNrXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICBcdFx0JGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcdFx0XHR2YXIgc2V0dGluZ3MgPSBzY29wZS5wb3B1cFNldHRpbmdzIHx8IHt9O1xyXG4gICAgXHRcdFx0c2V0dGluZ3MudGl0bGUgPSBzY29wZS5wb3B1cFRpdGxlO1xyXG4gICAgXHRcdFx0cG9wdXAub3BlbihzY29wZS5wb3B1cCwgc2V0dGluZ3MpO1xyXG4gICAgXHRcdH0pO1xyXG5cclxuICAgIFx0fSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KVx0XHJcblxyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuLmRpcmVjdGl2ZSgnY29uZmlybScsIGZ1bmN0aW9uKCR0aW1lb3V0LCBwb3B1cCkge1xyXG5cdHJldHVybiB7XHJcbiAgICBwcmlvcml0eTogMSxcclxuICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBjb25maXJtSWY6IFwiPVwiLFxyXG4gICAgICBuZ0NsaWNrOiAnJicsXHJcbiAgICAgIGNvbmZpcm06ICdAJyxcclxuICAgICAgY29uZmlybVRpdGxlOiAnQCcsXHJcbiAgICAgIGNvbmZpcm1PazogJ0AnLFxyXG4gICAgICBjb25maXJtQ2FuY2VsOiAnQCdcclxuICAgIH0sXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgIFx0ZnVuY3Rpb24gb25TdWNjZXNzKCkge1xyXG4gICAgICAgIHZhciByYXdFbCA9IGVsZW1lbnRbMF07XHJcbiAgICAgICAgaWYgKFtcImNoZWNrYm94XCIsIFwicmFkaW9cIl0uaW5kZXhPZihyYXdFbC50eXBlKSAhPSAtMSkge1xyXG4gICAgICAgICAgdmFyIG1vZGVsID0gZWxlbWVudC5kYXRhKCckbmdNb2RlbENvbnRyb2xsZXInKTtcclxuICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICBtb2RlbC4kc2V0Vmlld1ZhbHVlKCFyYXdFbC5jaGVja2VkKTtcclxuICAgICAgICAgICAgbW9kZWwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmF3RWwuY2hlY2tlZCA9ICFyYXdFbC5jaGVja2VkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzY29wZS5uZ0NsaWNrKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsZW1lbnQudW5iaW5kKFwiY2xpY2tcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHNjb3BlLmNvbmZpcm1JZikgfHwgc2NvcGUuY29uZmlybUlmKSB7XHJcbiAgICAgICAgICBcdHZhciByZXN1bHQgPSBwb3B1cC5jb25maXJtKHNjb3BlLmNvbmZpcm1UaXRsZSwgc2NvcGUuY29uZmlybSkudGhlbihvblN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICBpZiAoc2NvcGUuY29uZmlybU9rKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0LnRoZW4oc2NvcGUuY29uZmlybU9rKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NvcGUuY29uZmlybUNhbmNlbCkge1xyXG4gICAgICAgICAgICAgIHJlc3VsdC5jYXRjaChzY29wZS5jb25maXJtQ2FuY2VsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSlcdFxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbi5zZXJ2aWNlKCdwb3B1cCcsIGZ1bmN0aW9uICgkdWliTW9kYWwsICRyb290U2NvcGUpIHtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gdWN3b3JkcyAoc3RyKSB7XHJcblx0XHRcdHJldHVybiAoc3RyICsgJycpLnJlcGxhY2UoL14oW2Etel0pfFxccysoW2Etel0pL2csIGZ1bmN0aW9uICgkMSkge1xyXG5cdFx0XHRcdHJldHVybiAkMS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDcmVhdGUgdGhlIHRlbXBsYXRlVXJsIGZvciBhIHJvdXRlIHRvIG91ciByZXNvdXJjZSB0aGF0IGRvZXMgdGhlIHNwZWNpZmllZCBvcGVyYXRpb24uXHJcblx0XHR2YXIgdGVtcGxhdGVVcmwgPSBmdW5jdGlvbihyZXNvdXJjZU5hbWUpIHtcclxuXHRcdFx0cmV0dXJuICdjb21tb24vbW9kYWwvJyArIHJlc291cmNlTmFtZSArICcvJyArIHJlc291cmNlTmFtZS50b0xvd2VyQ2FzZSgpICsgJy5odG1sJztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIG5hbWUgZm9yIGEgcm91dGUgdG8gb3VyIHJlc291cmNlIHRoYXQgZG9lcyB0aGUgc3BlY2lmaWVkIG9wZXJhdGlvbi5cclxuXHRcdHZhciBjb250cm9sbGVyTmFtZSA9IGZ1bmN0aW9uKHJlc291cmNlTmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gJ01vZGFsJysgdWN3b3JkcyhyZXNvdXJjZU5hbWUpICsnQ3RybCc7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQG1ldGhvZCByZW1vdmVBbGxcclxuXHRcdCAqIFxyXG5cdFx0ICogQHJldHVybiAodm9pZClcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZW1vdmVBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoYW5ndWxhci5lbGVtZW50KCcubW9kYWwnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0YW5ndWxhci5mb3JFYWNoKGFuZ3VsYXIuZWxlbWVudCgnLm1vZGFsJyksIGZ1bmN0aW9uKG1vZGFsKSB7XHJcblx0XHRcdFx0XHRhbmd1bGFyLmVsZW1lbnQobW9kYWwpLnNjb3BlKCkuY2FuY2VsKCdyZW1vdmUnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQG1ldGhvZCBvcGVuMlxyXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSByZXNvdXJjZU5hbWVcclxuXHRcdCAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG5cdFx0ICogQHJldHVybiB7JHVpYk1vZGFsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9wZW4gPSBmdW5jdGlvbihyZXNvdXJjZU5hbWUsIG9wdGlvbnMsIGZuMSwgZm4yKSB7XHJcblx0XHRcdG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7XHJcblx0XHRcdFx0dGl0bGU6IFwiXCIsXHJcblx0XHRcdFx0Ym9keTogXCJcIixcclxuXHRcdFx0XHRhbmltYXRpb246IHRydWUsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IHRlbXBsYXRlVXJsKHJlc291cmNlTmFtZSksXHJcblx0XHRcdFx0Y29udHJvbGxlcjogY29udHJvbGxlck5hbWUocmVzb3VyY2VOYW1lKSxcclxuXHRcdFx0XHR3aW5kb3dDbGFzczogXCJtb2RhbC1nYW1lXCIsXHJcblx0XHRcdFx0YmFja2Ryb3A6IGZhbHNlLFxyXG5cdFx0XHR9LCBvcHRpb25zKTtcclxuXHJcblx0XHRcdGlmKCFvcHRpb25zLnJlc29sdmUpIHtcclxuXHRcdFx0XHRvcHRpb25zLnJlc29sdmUgPSB7XHJcblx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiBvcHRpb25zLnRpdGxlLFxyXG5cdFx0XHRcdFx0XHRib2R5OiBvcHRpb25zLmJvZHksXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBvcHRpb25zLnRpdGxlO1xyXG5cdFx0XHRkZWxldGUgb3B0aW9ucy5ib2R5O1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gICR1aWJNb2RhbC5vcGVuKG9wdGlvbnMpLnJlc3VsdDtcclxuXHJcblx0XHRcdGlmKGFuZ3VsYXIuaXNGdW5jdGlvbihmbjEpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnRoZW4oZm4xKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihhbmd1bGFyLmlzRnVuY3Rpb24oZm4yKSkge1xyXG5cdFx0XHRcdHJlc3VsdC5jYXRjaChmbjIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0LypcclxuXHRcdCAqIEBtZXRob2QgbWluaVxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudFxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm1pbmkgPSBmdW5jdGlvbiAoY29udGVudCkge1xyXG5cdFx0XHRcdGlmKCRyb290U2NvcGUucG9wdXBEYXRhKSBjbGVhclRpbWVvdXQoJHJvb3RTY29wZS5wb3B1cERhdGEudGltZU91dCk7XHJcblx0XHRcdFx0JHJvb3RTY29wZS5wb3B1cERhdGEgPSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQsXHJcblx0XHRcdFx0XHRcdHNob3c6IHRydWUsXHJcblx0XHRcdFx0XHRcdHRpbWVPdXQ6IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCRyb290U2NvcGUucG9wdXBEYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvb3RTY29wZS5wb3B1cERhdGEuc2hvdyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRyb290U2NvcGUuZGlnZXN0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0sIDMwMDApXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQkcm9vdFNjb3BlLmRpZ2VzdCgpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBbbG9naW4gZGVzY3JpcHRpb25dXHJcblx0XHQgKiBAcmV0dXJuIHskdWliTW9kYWx9IFtkZXNjcmlwdGlvbl1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChzaXplKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wZW4oJ2xvZ2luJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBbcmVnaXN0ZXIgZGVzY3JpcHRpb25dXHJcblx0XHQgKiBAcmV0dXJuIHskdWliTW9kYWx9IFtkZXNjcmlwdGlvbl1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChzaXplKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wZW4oJ3JlZ2lzdGVyJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBbcHJvZmlsZSBkZXNjcmlwdGlvbl1cclxuXHRcdCAqIEByZXR1cm4geyR1aWJNb2RhbH0gW2Rlc2NyaXB0aW9uXVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnByb2ZpbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHRcdFx0dmFyIHNpemUgPSBvcHRpb25zLnNpemUgIHx8ICdsZyc7XHJcblx0XHRcdGRlbGV0ZSBvcHRpb25zLnNpemU7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wZW4oJ3Byb2ZpbGUnLCB7XHJcblx0XHRcdFx0c2l6ZTogc2l6ZSxcclxuXHRcdFx0XHRyZXNvbHZlOiB7XHJcblx0XHRcdFx0XHRvcHRpb25zOiBvcHRpb25zXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBbcHJvZmlsZSBkZXNjcmlwdGlvbl1cclxuXHRcdCAqIEByZXR1cm4geyR1aWJNb2RhbH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnZpdGF0aW9uID0gZnVuY3Rpb24gKGRhdGEsIHNpemUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMub3BlbignaW52aXRhdGlvbicsIHtcclxuXHRcdFx0XHRzaXplOiBzaXplLFxyXG5cdFx0XHRcdHJlc29sdmU6IHtcclxuXHRcdFx0XHRcdGRhdGE6IGRhdGFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEBtZXRob2QgY29uZmlybVxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgdGl0bGVcclxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICBib2R5XHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgIGZuMVxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHskdWliTW9kYWx9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY29uZmlybSA9IGZ1bmN0aW9uICh0aXRsZSwgYm9keSwgZm4xLCBmbjIpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMub3BlbignY29uZmlybScsIHtcclxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdFx0Ym9keTogYm9keVxyXG5cdFx0XHR9LCBmbjEsIGZuMik7IFxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQG1ldGhvZCBjb25maXJtXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICB0aXRsZVxyXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgIGJvZHlcclxuXHRcdCAqIFxyXG5cdFx0ICogQHJldHVybiB7JHVpYk1vZGFsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmFsZXJ0ID0gZnVuY3Rpb24gKHRpdGxlLCBib2R5KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wZW4oJ2FsZXJ0Jywge1xyXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcclxuXHRcdFx0XHRib2R5OiBib2R5XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG59KTtcclxuXHJcbiAiLCJcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nKVxyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuLnNlcnZpY2UoJ3NldHRpbmdzJywgZnVuY3Rpb24oJGxvY2FsU3RvcmFnZSkge1xyXG5cclxuXHQvKipcclxuXHQgKiBAY2xhc3MgU2V0dGluZ1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIFNldHRpbmcoKSB7XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7XHJcblx0XHRcdHZvbHVtZTogMSxcclxuXHRcdFx0aW52aXRlOiAxXHJcblx0XHR9O1xyXG5cclxuXHQgIC8vIHNhdmUgc2V0dGluZ3MgdG8gbG9jYWwgc3RvcmFnZVxyXG5cdCAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCgkbG9jYWxTdG9yYWdlLnNldHRpbmdzKSApIHtcclxuXHQgICAgJGxvY2FsU3RvcmFnZS5zZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XHJcblx0ICB9XHJcblxyXG5cdCAgcmV0dXJuICRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbmV3IFNldHRpbmcoKTtcclxuXHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb25maWcnKVxyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgICAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgIC5vdGhlcndpc2UoJy8nKTtcclxuICAkc3RhdGVQcm92aWRlclxyXG4gICAgLnN0YXRlKCdhcHAnLCB7XHJcbiAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICB1cmw6ICcnLFxyXG4gICAgICB0ZW1wbGF0ZVVybDogJ3dlYi9hcHAuaHRtbCdcclxuICAgIH0pXHJcbiAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xyXG4gICAgICB1cmw6ICcvJyxcclxuICAgICAgdGVtcGxhdGVVcmw6ICd3ZWIvaG9tZS5odG1sJyxcclxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xyXG4gICAgfSk7XHJcbn0pIFxyXG5cclxuLyoqXHJcbiAqIEBuZ0luamVjdFxyXG4gKi9cclxuLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcykge1xyXG4gICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xyXG59KTsiLCIvKipcclxuICogQG5nZG9jIHNlcnZpY2VcclxuICogQG5hbWUgY29yZS5hdXRoXHJcbiAqIEByZXF1aXJlcyBuZ1N0b3JhZ2VcclxuICpcclxuICogQGV4YW1wbGVcclxuICpcclxuICogXHJcbiAqIGBgYGpzXHJcbiAqIGFuZ3VsYXIoJ215TW9kdWxlJywgWydjb3JlJ10pXHJcbiAqIC5jb250cm9sbGVyKCdteUNvbnRyb2xsZXInLCBmdW5jdGlvbihBdXRoTWFuYWdlciwgVXNlcikge1xyXG4gKlxyXG4gKiAgdmFyIGF1dGggPSBuZXcgQXV0aE1hbmFnZXIoKTtcclxuICpcclxuICogIFVzZXIubG9naW4oe3VzZXJuYW1lOiAxLCBwYXNzd29yZDoxfSlcclxuICogIC50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gKiAgICBhdXRoLmxvZ2luKHJlcyk7XHJcbiAqICB9KVxyXG4gKiAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gKiAgICBhdXRoLmNsZWFyQWxsKCk7XHJcbiAqICB9KTtcclxuICpcclxuICpcclxuICogIGF1dGgubG9nb3V0KCk7XHJcbiAqXHJcbiAqICBhdXRoLmlzUmVtZWJlck1lKCk7XHJcbiAqXHJcbiAqICBhdXRoLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gKiAgIFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY29yZS5hdXRoJywgWyduZ1N0b3JhZ2UnXSlcclxuXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbi5mYWN0b3J5KCdBdXRoTWFuYWdlcicsIGZ1bmN0aW9uKCRsb2NhbFN0b3JhZ2UsICRzZXNzaW9uU3RvcmFnZSwgJHEpIHtcclxuICBBdXRoTWFuYWdlci5wcm90b3R5cGUgPSBhbmd1bGFyLmNvcHkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XHJcblxyXG5cclxuICBmdW5jdGlvbiBTdG9yYWdlKHByZWZpeCkge1xyXG4gICAgcHJlZml4ID0gXCJBVVRIOlwiICsgcHJlZml4O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7U3R5bGV9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2F2ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgdmFyIHN0b3JhZ2UgPSBkYXRhLnJlbWVtYmVyTWUgPyAkbG9jYWxTdG9yYWdlOiAkc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgIHN0b3JhZ2VbdGhpcy5wcmVmaXhdID0gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVhZFxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuICRsb2NhbFN0b3JhZ2VbdGhpcy5wcmVmaXhdIHx8ICRzZXNzaW9uU3RvcmFnZVt0aGlzLnByZWZpeF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhclxyXG4gICAgICovXHJcbiAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICRsb2NhbFN0b3JhZ2VbdGhpcy5wcmVmaXhdID0gbnVsbDtcclxuICAgICAgJHNlc3Npb25TdG9yYWdlW3RoaXMucHJlZml4XSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEF1dGggbWFuYWdlclxyXG4gICAqIEBwcm9wZXJ0eSB7VXNlcjxPYmplY3Q+fSB1c2VyXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gQXV0aE1hbmFnZXIob3B0aW9ucykge1xyXG4gICAgdGhpcy51c2VyID0gbnVsbDtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgPyBvcHRpb25zIDoge307XHJcbiAgICB0aGlzLmluaXRpYWxBdXRoUmVzb2x2ZSA9ICRxLmRlZmVyKCk7XHJcbiAgICB0aGlzLl9zdG9yYWdlID0gbmV3IFN0b3JhZ2UodGhpcy5vcHRpb25zLnByZWZpeCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAgSXMgcmVtZW1lYmVyIG1lXHJcbiAgICovXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLmlzUmVtZW1iZXJNZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLmdldFN0b3JhZ2UoKSAmJiB0aGlzLmdldFN0b3JhZ2UoKS5yZW1lbWJlck1lKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTYXZlIGN1cnJlbnQgdXNlciBsb2dpblxyXG4gICAqIEBwYXJhbSAge1VzZXI8T2JqZWN0Pn0gZGF0YVxyXG4gICAqIEByZXR1cm4ge0F1dGhNYW5hZ2VyPE9iamVjdD59XHJcbiAgICovXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB0aGlzLl9zdG9yYWdlLnNhdmUoZGF0YSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICBBdXRoTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy51c2VyID0gbnVsbDtcclxuICAgIHRoaXMuaW5pdGlhbEF1dGhSZXNvbHZlID0gJHEuZGVmZXIoKTtcclxuICB9XHJcblxyXG4gIEF1dGhNYW5hZ2VyLnByb3RvdHlwZS5nZXRTdG9yYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5yZWFkKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLnNldFBhc3N3b3JkID0gZnVuY3Rpb24obmV3VmFsdWUpIHtcclxuICAgIHRoaXMuZ2V0U3RvcmFnZSgpLnBhc3N3b3JkID0gbmV3VmFsdWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLmlzQXV0aGVudGljYXRlZD0gZnVuY3Rpb24oYXJndW1lbnQpIHtcclxuICAgIHJldHVybiAhIXRoaXMudXNlcjtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBbc2V0VXNlciBkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0ge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy51c2VyID0gZGF0YTtcclxuICAgIHJldHVybiB0aGlzLmluaXRpYWxBdXRoUmVzb2x2ZS5yZXNvbHZlKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHVzZXIgaW5mb1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIEF1dGhNYW5hZ2VyLnByb3RvdHlwZS5nZXRVc2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIExvZ291dFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7QXV0aE1hbmFnZXI8T2JqZWN0Pn1cclxuICAgKi9cclxuICBBdXRoTWFuYWdlci5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZih0aGlzLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgIHRoaXMudXNlci5sb2dvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGlhbEF1dGhSZXNvbHZlID0gJHEuZGVmZXIoKTtcclxuICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGN1cnJlbnQgdXNlclxyXG4gICAqL1xyXG4gIEF1dGhNYW5hZ2VyLnByb3RvdHlwZS5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudXNlciA9IG51bGw7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgZGF0YSBmcm9tIHN0b3JhZ2VcclxuICAgKiBDbGVhciB1c2VyIGRhdGFcclxuICAgKi9cclxuICBBdXRoTWFuYWdlci5wcm90b3R5cGUuY2xlYXJBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3N0b3JhZ2UuY2xlYXIoKTtcclxuICAgIHRoaXMuY2xlYXJVc2VyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVdGlsaXR5IG1ldGhvZCB3aGljaCBjYW4gYmUgdXNlZCBpbiBhIHJvdXRlJ3MgcmVzb2x2ZSgpIG1ldGhvZCB0byBncmFiIHRoZSBjdXJyZW50XHJcbiAgICogYXV0aGVudGljYXRpb24gZGF0YS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdHxudWxsPn0gQSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHRoZSBjbGllbnQncyBjdXJyZW50IGF1dGhlbnRpY2F0aW9uXHJcbiAgICogc3RhdGUsIHdoaWNoIHdpbGwgYmUgbnVsbCBpZiB0aGUgY2xpZW50IGlzIG5vdCBhdXRoZW50aWNhdGVkLlxyXG4gICAqL1xyXG4gIEF1dGhNYW5hZ2VyLnByb3RvdHlwZS4kd2FpdEZvckF1dGggPSBmdW5jdGlvbihjYikge1xyXG4gICAgdGhpcy5pbml0aWFsQXV0aFJlc29sdmUucHJvbWlzZS50aGVuKGNiKTtcclxuICB9XHJcblxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFV0aWxpdHkgbWV0aG9kIHdoaWNoIGNhbiBiZSB1c2VkIGluIGEgcm91dGUncyByZXNvbHZlKCkgbWV0aG9kIHRvIHJlcXVpcmUgdGhhdCBhIHJvdXRlIGhhc1xyXG4gICAqIGEgbG9nZ2VkIGluIGNsaWVudC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IEEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB0aGUgY2xpZW50J3MgY3VycmVudCBhdXRoZW50aWNhdGlvblxyXG4gICAqIHN0YXRlIG9yIHJlamVjdGVkIGlmIHRoZSBjbGllbnQgaXMgbm90IGF1dGhlbnRpY2F0ZWQuXHJcbiAgICovXHJcbiAgQXV0aE1hbmFnZXIucHJvdG90eXBlLnJlcXVpcmVBdXRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICBmdW5jdGlvbiByZWplY3QoZXJyKSB7XHJcbiAgICAgIHZhciBkZWYgPSAkcS5kZWZlcigpO1xyXG4gICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy5nZXRTdG9yYWdlKCkpIHtcclxuICAgICAgcmV0dXJuIHJlamVjdCgnQVVUSF9SRVFVSVJFRCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluaXRpYWxBdXRoUmVzb2x2ZVxyXG4gICAgLnByb21pc2VcclxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgcmV0dXJuIHJlamVjdCgnQVVUSF9SRVFVSVJFRCcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIEF1dGhNYW5hZ2VyO1xyXG59KSIsImFuZ3VsYXIubW9kdWxlKCdjb3JlLnV0aWxzJywgW10pXHJcbi8qKlxyXG4gKiBAbmdJbmplY3RcclxuICovXHJcbi5zZXJ2aWNlKCd1dGlscycsIGZ1bmN0aW9uKCRxKSB7XHJcbiAgdGhpcy5wcm9taXNlID0gZnVuY3Rpb24oY2IpIHtcclxuICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICBjYihkZWZlcik7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICB9IFxyXG5cclxuXHJcblxyXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzUwOTgzMS9hbHRlcm5hdGl2ZS1mb3ItdGhlLWRlcHJlY2F0ZWQtcHJvdG9cclxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvY3JlYXRlXHJcbiAgdGhpcy5pbmhlcml0ID0gZnVuY3Rpb24oQ2hpbGRDbGFzcywgUGFyZW50Q2xhc3MsIG1ldGhvZHMpIHtcclxuICAgIHZhciBjaGlsZE1ldGhvZHMgPSBDaGlsZENsYXNzLnByb3RvdHlwZTtcclxuICAgIENoaWxkQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJlbnRDbGFzcy5wcm90b3R5cGUpO1xyXG4gICAgQ2hpbGRDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGlsZENsYXNzOyAvLyByZXN0b3JpbmcgcHJvcGVyIGNvbnN0cnVjdG9yIGZvciBjaGlsZCBjbGFzc1xyXG4gICAgYW5ndWxhci5mb3JFYWNoKE9iamVjdC5rZXlzKGNoaWxkTWV0aG9kcyksIGZ1bmN0aW9uKGspIHtcclxuICAgICAgQ2hpbGRDbGFzcy5wcm90b3R5cGVba10gPSBjaGlsZE1ldGhvZHNba107XHJcbiAgICB9KTtcclxuICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KG1ldGhvZHMpICkge1xyXG4gICAgICBhbmd1bGFyLmV4dGVuZChDaGlsZENsYXNzLnByb3RvdHlwZSwgbWV0aG9kcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ2hpbGRDbGFzcztcclxuICB9XHJcblxyXG59KSIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uJylcclxuXHJcbi5jb250cm9sbGVyKCdNb2RhbEFsZXJ0Q3RybCcsIE1vZGFsQWxlcnRDdHJsKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTW9kYWxBbGVydEN0cmwoJHNjb3BlLCBkYXRhLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG5cdCRzY29wZS50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0JHNjb3BlLmJvZHkgPSBkYXRhLmJvZHk7XHJcbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgIHJlYXNvbiAgPSByZWFzb24gfHwgJ2NhbmNlbCc7XHJcbiAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKHJlYXNvbik7XHJcbiAgfTtcclxufSIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uJylcclxuXHJcbi5jb250cm9sbGVyKCdNb2RhbENvbmZpcm1DdHJsJywgTW9kYWxDb25maXJtQ3RybCk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE1vZGFsQ29uZmlybUN0cmwoJHNjb3BlLCBkYXRhLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG5cdCRzY29wZS50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0JHNjb3BlLmJvZHkgPSBkYXRhLmJvZHk7XHJcblx0JHNjb3BlLm9rID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgcmVhc29uICA9IHJlYXNvbiB8fCAnb2snO1xyXG4gICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UocmVhc29uKTtcclxuICB9O1xyXG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICByZWFzb24gID0gcmVhc29uIHx8ICdjYW5jZWwnO1xyXG4gICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhyZWFzb24pO1xyXG4gIH07XHJcbn0iLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uJylcclxuXHJcbi5jb250cm9sbGVyKCdNb2RhbEludml0YXRpb25DdHJsJywgTW9kYWxJbnZpdGF0aW9uQ3RybCk7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBNb2RhbEludml0YXRpb25DdHJsKCRzY29wZSwgZGF0YSwgJHVpYk1vZGFsSW5zdGFuY2UsIHNldHRpbmdzKSB7XHJcblx0JHNjb3BlLmRhdGEgPSBkYXRhO1xyXG5cdCRzY29wZS5kaXNhYmxlSW52aXRhdGlvbiA9IGZhbHNlO1xyXG5cdCRzY29wZS5vbkRpc2FibGVJbnZpdGF0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRkaXNhYmxlSW52aXRhdGlvbiA9ICRzY29wZS5kaXNhYmxlSW52aXRhdGlvbjtcclxuXHR9XHJcblx0JHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUub25EaXNhYmxlSW52aXRhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gIFx0c2V0dGluZ3MuZGlzYWJsZUludml0YXRpb24gPSAkc2NvcGUuZGlzYWJsZUludml0YXRpb247XHJcbiAgfVxyXG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICB9O1xyXG59ICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
