var router = require('express').Router();
var controller = require('./controller.js');
var _super = require('../abstract/route');

_super(router, controller);

module.exports = router;