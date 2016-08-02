angular.module('core.utils', [])
/**
 * @ngInject
 */
.service('utils', function($q) {
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

})