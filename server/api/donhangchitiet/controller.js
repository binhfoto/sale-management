var Model = require('./model');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'refId maSP');
controller.get = _super.get(Model, 'refId maSP');
controller.getOne = _super.getOne();
controller.put = _super.put(Model);
controller.post = _super.post(Model);
controller.delete = _super.delete();

module.exports = controller;