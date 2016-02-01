var readline = require('readline');
var wizard = require('../autoform/_wizard');
var form = require('../autoform/_form');
var fill = require('../autoform/_fill');
var ry = new RegExp(/^(?:y|yes)$/);
var cfg = require('../config.json');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function doWizard (done) {
  wizard( function (res) {
    if (res.missing.length) {

      console.log(getTime(),'You have missing forms: ' + res.missing);

      if (cfg.autoform) {
        console.log(getTime(),'Running autogenerated forms.');
        generator(res);
        return done();
      }

      rl.question(getTime(), 'Do you want to create forms (y/N)?', function(a) {
        if (ry.test(a)) {
          generator(res);
        }

        rl.close();
        done();
      });
    } else {
      console.log(getTime(), 'Forms by models are OK.');
      done();
    }
  });
}

function generator (res) {
  fill(res.models);
  for (var i in res.missing) {
    form.add({
      name: res.missing[i],
      resource: {
        schema: res.schemas[res.missing[i]].schema
      }
    });
  }
}

function getTime () {
  var date =  new Date();
  return ['[', date.getHours(), date.getMinutes(), date.getSeconds(),'] '].join(':');
}


module.exports = doWizard;
