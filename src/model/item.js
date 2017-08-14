'use strict';

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  type: {type: String},
  name: {type: String},
  photoURI: {type: String},
  description: {type: String},
  price: {type: Number},
  motorPower: {type: String},
  maxSpeed: {type: String},
  maxLoadCapacity: {type: String},
  chargingTime: {type: String},
  wheelStyle: {type: String},
  batteryCapacity: {type: String},
  transmission: {type: String},
  remote: {type: String},
  autoPowerShutOff: {type: Boolean},
  truckStyle: {type: String},
  weight: {type: String},
  length: {type: String},
  width: {type: String},
  height: {type: String},
  climbingAngle: {type: String},
  voltagePeak: {type: String},
  voltageWorking: {type: String},
  capacity: {type: String},
  power: {type: String},
  cutOffVoltage: {type: String},
  maxDischargingCurrent: {type: String},
  maxContinuousDischargingAmperage: {type: String},
  ratedDischargingAmperage: {type: String},
  chargingCurrent: {type: String},
  chargingVoltage: {type: String},
  runTime: {type: String},
  lifecycle: {type: String},
  color: {type: String},
  turning: {type: String},
  dualDrive: {type: Boolean},
  bec: {type: String},
  lipo: {type: String},
  voltage: {type: String},
  feature: {type: String},
  firmwareVersion: {type: String},
  parameters: {type: String},
  continuousCurrent: {type: String},
  burstCurrent: {type: String},
});

const Item = module.exports = mongoose.model('item', itemSchema);

Item.create = (data) => {
  console.log('item data: ', data);
  //run photo through aws first.

};

Item.read = (data) => {
  console.log('item data: ', data);

};
Item.update = (data) => {
  console.log('item data: ', data);

};

Item.delete = (data) => {
  console.log('item data: ', data);

};
