var Model = require('./model');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'sanpham');
controller.get = _super.get(Model, 'sanpham');
controller.getOne = _super.getOne();
controller.put = _super.put();
controller.post = _super.post(Model);
controller.delete = _super.delete();

module.exports = controller;