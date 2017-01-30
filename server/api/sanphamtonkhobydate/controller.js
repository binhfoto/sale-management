var Model = require('./model');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'maSP');
controller.get = _super.get(Model, 'maSP');
controller.getOne = _super.getOne();
controller.put = _super.put(Model);
controller.post = _super.post(Model);
controller.delete = _super.delete();

module.exports = controller;