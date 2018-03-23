const express = require('express');
const bodyParser = require('body-parser');
//const elasticsearchinsertion = require("../lib/");
//const Insert = require("../lib/"); 
//const connection = require("../lib/");
const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var fs = require("fs");
const router = express.Router();

router.get('/populate',(req,res) => {
    Brands();
   Insertion();
});

router.get('/cars',(req,res) =>{
    const searchParams = {
        'index': 'caradisiac',
        'body': {
            'size': 10,
            'query': {
                'match_all': {}
            },
            'sort': [
                {
                    'doc.volume.keyword': {
                        'order': 'desc'
                    }
                }
            ]
        }
    };
    connection.search(searchParams)
        .then((resp) => {
            res.send(resp.hits.hits)
        })
        .catch((err) => {
            res.send(err)
        });
})
async function Brands () {
  const brands = await getBrands();
  return brands;
}
function Insertion(){
    var json = JSON.parse(fs.readFileSync("populate.json","utf8"));
    var bodyBrand = {
        body:[
        ]
    };
    for(var i = 0; i < json.length; i++){    
        bodyBrand.body.push({ index:  { _index: 'caradisiac', _type: 'voiture', _id: i } });
        bodyBrand.body.push({  doc : json[i]} );

    }
    client.bulk(bodyBrand);
}

module.exports = router;