var util = require('../util');
exports.task = function() {
  return util.buildVendor(true);
};