// packages
var restify = require('restify');
// references
var filters     = require('../helpers/filters');
var generator   = require('../helpers/generator');
var controllers = require('./controllers');
var resources   = require("../config.json").resources;
var register    = require("./register");
// settings
var api = restify.createServer();
api.use(restify.bodyParser());
api.use(restify.queryParser());

// auto generated routes
try{
  for(var route in resources){
    if (resources.hasOwnProperty(route)) {
      if(resources[route].exclude){ continue; }
      generator.addRoutes(api, route, controllers[route], resources[route].schema);
    }
  }
}catch(e){
  console.log(e);
}

// custom routes
api.get('/ping', function(req, res){ res.send(200); });
api.post('/register/:email', function(req, res){
  register.addUser(req.params.email, function(err, success){
    if(err){
      return res.send(401, err);
    }

    res.send(200, success);
  });
});

module.exports.api = api;
