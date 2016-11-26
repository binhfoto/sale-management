var route = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

// before we send back a jwt, lets check the password and username match what is in DB 
route.post('/signin', verifyUser(), controller.signin);

module.exports = route;