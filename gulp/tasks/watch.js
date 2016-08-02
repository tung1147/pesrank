var gulp = require('gulp');
var config = require('../config');
exports.task = function() {
  gulp.watch(config.jsFiles, ['build-js']);
  gulp.watch(config.scssFiles, ['build-scss']);
  gulp.watch(config.htmlFiles, ['build-html']);
  gulp.watch(config.ngConfigFile, ['ng-config']);
};