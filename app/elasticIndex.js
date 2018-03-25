const jsonfile = require('jsonfile');
var client = require('../app/connectElastic.js');

module.exports.pop = function() {
  jsonfile.readFile(__dirname+'/car.json', function(err, res) {
    if(err) console.error(err);
    else {
      res.forEach((model, i) => {
        setTimeout(() => {
          client.index({
            index: 'caradisiac',
            id: model.uuid,
            type: 'model',
            body: model
          },function(err,resp,status) {
            console.log(resp);
          });
        }, i*5)
      })
    }
  })
}