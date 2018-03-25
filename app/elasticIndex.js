const jsonfile = require('jsonfile');
var client = require('../app/connectElastic.js');
const express = require('express')
const app = express()

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


app.get('/suv', function(req,res){

    client.search({
        index: 'caradisiac',
        type: 'model',
        body:{
            "size":400,
            "sort":[
                {"volume.keyword" :{"order":"desc"}}
            ]
        }
    },function (error, response,status) {
        if (error){
            console.log("ERROR : "+error)
        }
        else {
            res.send(response.hits.hits);
        }
    });

})

var port = 9200;
app.listen(port, function () {
    console.log('App listening on port ' + port + '!')
})


