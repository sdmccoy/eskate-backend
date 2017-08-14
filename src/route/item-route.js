'use strict';

const {Router} = require('express');
<<<<<<< HEAD
// const bearerAuth = require('../lib/bearer-auth.js');
// const s3Upload = require('../lib/s3-upload-middleware.js');
=======
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const s3Upload = require('../lib/s3-upload-middleware.js');
>>>>>>> f64f505925b14c182e7701025e39cb044d93a60c
const Item = require('../model/item.js');
const itemRouter = module.exports = new Router();

itemRouter.post('/item', (req, res, next) => {
  console.log('hit POST item route');
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
    .then(item => {
      console.log('post item res: ', item);
      //used on the front end.
      return res.json(item);
    })
    .catch(next);
});
