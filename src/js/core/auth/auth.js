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
.factory('AuthManager', function($localStorage, $sessionStorage, $q) {
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
})