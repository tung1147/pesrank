var util = require('../util');
exports.dependencies = ['build'];
exports.task = function() {
  return util.buildMin(true);
};