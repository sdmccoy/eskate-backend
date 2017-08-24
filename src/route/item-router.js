'use strict';

// const jsonParser = require('body-parser').json();
const {Router} = require('express');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const s3Upload = require('../lib/s3-upload-middleware.js');
const s3Delete = require('../lib/s3-delete-middleware.js');
const Item = require('../model/item.js');
const itemRouter = module.exports = new Router();


itemRouter.post('/item', bearerAuth, s3Upload('file'), (req, res, next) => {
  console.log('hit POST item route');
  // console.log('POST req.body:', req.body);
  // console.log('POST req.s3:', req.s3Data);

  // req.body = JSON.parse(req.body.item);
  req.body.photoURI = req.s3Data.Location;
  // console.log('POST req.body2:', req.body);

  new Item({
    type: req.body.type,
    name: req.body.name,
    photoURI: req.body.photoURI,
    description: req.body.description,
    price: req.body.price,
    motorPower: req.body.motorPower,
    maxSpeed: req.body.maxSpeed,
    maxLoadCapacity: req.body.maxLoadCapacity,
    chargingTime: req.body.chargingTime,
    wheelStyle: req.body.wheelStyle,
    batteryCapacity: req.body.batteryCapacity,
    transmission: req.body.transmission,
    remote: req.body.remote,
    autoPowerShutOff: req.body.autoPowerShutOff,
    truckStyle: req.body.truckStyle,
    weight: req.body.weight,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    climbingAngle: req.body.climbingAngle,
    voltagePeak: req.body.voltagePeak,
    voltageWorking: req.body.voltageWorking,
    capacity: req.body.capacity,
    power: req.body.power,
    cutOffVoltage: req.body.cutOffVoltage,
    maxDischargingCurrent: req.body.maxDischargingCurrent,
    maxContinuousDischargingAmperage: req.body.maxContinuousDischargingAmperage,
    ratedDischargingAmperage: req.body.ratedDischargingAmperage,
    chargingCurrent: req.body.chargingCurrent,
    chargingVoltage: req.body.chargingVoltage,
    runTime: req.body.runTime,
    lifecycle: req.body.lifecycle,
    color: req.body.color,
    turning: req.body.turning,
    dualDrive: req.body.dualDrive,
    bec: req.body.bec,
    lipo: req.body.lipo,
    voltage: req.body.voltage,
    feature: req.body.feature,
    firmwareVersion: req.body.firmwareVersion,
    parameters: req.body.parameters,
    continuousCurrent: req.body.continuousCurrent,
    burstCurrent: req.body.burstCurrent,
  })
    .save()
    .then(item => res.json(item))
    .catch(next);
});

itemRouter.get('/item/:id', (req, res, next) => {
  console.log('hit GET item');
  Item.findOne({_id: req.params.id})
    .then(item => res.json(item))
    .catch(next);
});

itemRouter.get('/item', (req, res, next) => {
  console.log('hit GET multi items');
  Item.find({})
    .then(items => res.json(items))
    .catch(next);
});

itemRouter.put('/item/:id', bearerAuth, s3Upload('file'), (req, res, next) => {
  console.log('hit PUT item');
  //set the s3 location to the req.body
  req.body.photoURI = req.s3Data.Location;

  let options = {
    new: true,
    runValidators: true,
  };

  Item.findOneAndUpdate({_id: req.params.id}, req.body, options)
    .then(updatedItem => res.json(updatedItem))
    .catch(next);
});

itemRouter.delete('/item/:id', bearerAuth, (req, res, next) => {
  console.log('hit DELETE route');

  let photoURIKey = [];

  Item.findOne({_id: req.params.id})
    .then(item => {
      console.log('itemphotouir: ', item.photoURI);
      if(item.photoURI) {
        photoURIKey = item.photoURI.split('/');
        console.log('photoURIKey: ', photoURIKey);
        s3Delete(photoURIKey[photoURIKey.length-1]);
      }
      return Item.findByIdAndRemove(req.params.id);
    })
    .then(() => res.sendStatus(204))
    .catch(next);

});
