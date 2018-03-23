const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var data = [];

const jsonfile = require('jsonfile');


var count = 0;
var result = [];

async function Brands () {
  const brands = await getBrands();
  return brands;
}

async function models (brand, callback) {
  console.log(brand)
  const models = await getModels(brand);

  if(models.length == 0) {
    console.log( brand )
  }
  else {
    models.forEach((mod) => {
      console.log(mod.model +  + mod.brand);
      mod.volume = Number(mod.volume); //convert volume into a number
      result.push(mod);
      count++;
    })
  }
  setTimeout(() => {
    callback();
  }, 500);
}

Brands().then(function(brands) {
    brands.reduce((promiseChain, item) => {
      return promiseChain.then(() =>  new Promise((resolve) => {
        models(item, resolve)
      }))
    }, Promise.resolve())
    .then(() => {
      console.log('\nnumber of models : ' + count);
      jsonfile.writeFile('list_of_cars.json', result, {spaces: 2}, function(err){
        if(err) console.error(err);
        else {
          console.log('\njson done')
        }
      })
    })
})
//console.log(Brands());

module.exports = {Brands:Brands}