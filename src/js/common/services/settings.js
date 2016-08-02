

angular.module('common')

/**
 * @ngInject
 */
.service('settings', function($localStorage) {

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

});