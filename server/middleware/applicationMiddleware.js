// tracking http requests
var morgan = require('morgan');
// 
var bodyParser = require('body-parser');
// cross origin resource share, allow mydomain.com send/receive data to/from yourdomain.com
var cors = require('cors');
// 
var override = require('method-override');

// setup global middleware here
module.exports = function(app){
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
};