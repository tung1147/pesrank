var gulp = require('gulp');
var through2 = require('through2');
var Buffer = require('buffer').Buffer;
var findModule = require('../config/ngModuleData.js');

exports.addJsWrapper = function(enforce) {
  return through2.obj(function(file, enc, next) {
    var module = findModule.any(file.contents);
    if (!!enforce || module) {
      file.contents = new Buffer([
          !!enforce ? '(function(){' : '(function( window, angular, undefined ){',
          '"use strict";\n',
          file.contents.toString(),
          !!enforce ? '})();' : '})(window, window.angular);'
      ].join('\n'));
    }
    this.push(file);
    next();
  });
};