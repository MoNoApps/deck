var models    = require('../helpers/models');
var resources = require('../config.json').resoures;
var usersData = require('./data/users.json');


for (var u in usersData){
  models.users.Insert(usersData[u]);
}