// no var needed here, colors will attach colors to String.prototype
require('colors');
var _ = require('lodash');
var config = require('../config/config.js');

// create nothing function for when logging is disabled
var nothing = function(){};

// check if logging is enabled in the config
// if it is, then use console.log
// if not, then use nothing function
var consoleLog = config.logging ? console.log.bind(console) : nothing;

var logger = {
    log: function() {

        // step 1: process the argument: color it
        // arguments is and array like object with all the passed arguments to this function
        var args = _.toArray(arguments)
            .map(function(arg){
                if(typeof arg === 'object'){
                    // turn an object to a string so we can log all properties and color it
                    var string = JSON.stringify(arg, 2);
                    return string.magenta;
                }else{
                    arg += '';
                    return arg.magenta;
                }
            });
        
        // step 2: pass arguments to real console.log
        // call either console.log or nothing here
        // with the console object as the context and the new colored args        
        consoleLog.apply(console, args);

    }
};

module.exports = logger;

/*
How to use 'bind' method

Suppose you wanted a shorter form of console.log, like f. You might do this:

var f = console.log; // <== Suspect!
...but if the log function relies on this referring to the console object during the call, then calling f("Message here") won't work, because this won't refer to console.

Function#bind is for just that situation: It lets you create a new function that, when called, will call the original with this set to the value you give. So

var f = console.log.bind(console); // Still suspect, for a different reason
...should, in theory, give you a function, f, that you can call to log to the console.
*/


/*
How to use 'apply' method
The apply() method calls a function with a given this value and arguments provided as an array (or an array-like object).

*/