'use strict';

require('dotenv').config();
const server = require('../src/lib/server.js');
const expect = require('expect');
const superagent = require('superagent');
const mockUser = require('./mock/mock-user.js');
// const mockItem = require('./mock/mock-item.js');
const API_URL = process.env.API_URL;
let tempUserData;
let tempItemData;

describe('Testing Item routes', () => {
  //start stop server
  before(server.start);
  after(server.stop);
  //clear the db?

  describe('Testing POST item route', () => {
    it('it should return with a new item', () => {
      return mockUser.mockOne().then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/item`)
          .set('Authorization', `Bearer ${tempUserData.token}`)
          .field('item', JSON.stringify({
            type: 'board',
            name: 'testing Mtn Board',
            description: 'an amazing board',
            price: 500,
            motorPower: '50 wat',
            maxSpeed: '35mph',
            maxLoadCapacity: '300lb',
            chargingTime: '4hrs',
            wheelStyle: 'aluminum',
            batteryCapacity: '100wat',
            transmission: 'dual belt',
            remote: 'trigger',
            autoPowerShutOff: 'yes',
            truckStyle: 'long',
            weight: '30lb',
            length: '100cm',
            width: '40cm',
            height: '10cm',
            climbingAngle: '20deg',
            voltagePeak: '20v',
            voltageWorking: '10v',
            capacity: '50amp',
            power: '400v',
            cutOffVoltage: '40v',
            maxDischargingCurrent: '30v',
            maxContinuousDischargingAmperage: '15amp',
            ratedDischargingAmperage: '10amp',
            chargingCurrent: '12amp',
            chargingVoltage: '25v',
            runTime: '5hrs',
            lifecycle: '800mah',
            color: 'red',
            turning: 'slow',
            dualDrive: 'yes',
            bec: 'bec what',
            lipo: 'yes',
            voltage: '55v',
            feature: 'of course',
            firmwareVersion: 'v 10',
            parameters: 'all of the params',
            continuousCurrent: '40amp',
            burstCurrent: '60amp'}))
          .set('Content-Type', 'image/png')
          .attach('file', `${__dirname}/temp-assets/testpicture.png`);
      })
        .then(res => {
          tempItemData = res.body;
          expect(res.body.type).toEqual('board');
          expect(res.body.name).toEqual('testing Mtn Board');
          expect(res.body.photoURI).toExist();
          expect(res.body.description).toEqual('an amazing board');
          expect(res.body.price).toEqual('500');
          expect(res.body.motorPower).toEqual('50 wat');
          expect(res.body.maxSpeed).toEqual('35mph');
          expect(res.body.maxLoadCapacity).toEqual('300lb');
          expect(res.body.chargingTime).toEqual('4hrs');
          expect(res.body.wheelStyle).toEqual('aluminum');
          expect(res.body.batteryCapacity).toEqual('100wat');
          expect(res.body.transmission).toEqual('dual belt');
          expect(res.body.remote).toEqual('trigger');
          expect(res.body.autoPowerShutOff).toEqual('yes');
          expect(res.body.truckStyle).toEqual('long');
          expect(res.body.weight).toEqual('30lb');
          expect(res.body.length).toEqual('100cm');
          expect(res.body.width).toEqual('40cm');
          expect(res.body.height).toEqual('10cm');
          expect(res.body.climbingAngle).toEqual('20deg');
          expect(res.body.voltagePeak).toEqual('20v');
          expect(res.body.voltageWorking).toEqual('10v');
          expect(res.body.capacity).toEqual('50amp');
          expect(res.body.power).toEqual('400v');
          expect(res.body.cutOffVoltage).toEqual('40v');
          expect(res.body.maxDischargingCurrent).toEqual('30v');
          expect(res.body.maxContinuousDischargingAmperage).toEqual('15amp');
          expect(res.body.ratedDischargingAmperage).toEqual('10amp');
          expect(res.body.chargingCurrent).toEqual('12amp');
          expect(res.body.chargingVoltage).toEqual('25v');
          expect(res.body.runTime).toEqual('5hrs');
          expect(res.body.lifecycle).toEqual('800mah');
          expect(res.body.color).toEqual('red');
          expect(res.body.turning).toEqual('slow');
          expect(res.body.dualDrive).toEqual('yes');
          expect(res.body.bec).toEqual('bec what');
          expect(res.body.lipo).toEqual('yes');
          expect(res.body.voltage).toEqual('55v');
          expect(res.body.feature).toEqual('of course');
          expect(res.body.firmwareVersion).toEqual('v 10');
          expect(res.body.parameters).toEqual('all of the params');
          expect(res.body.continuousCurrent).toEqual('40amp');
          expect(res.body.burstCurrent).toEqual('60amp');
          expect(res.body._id).toExist();
        });
    });
  });

  describe('Testing GET item route', () => {
    it('it should return with a specific item', () => {
      return superagent.get(`${API_URL}/item/${tempItemData._id}`)
        .then(res => {
          expect(res.body.type).toEqual(tempItemData.type);
          expect(res.body.name).toEqual(tempItemData.name);
          expect(res.body.photoURI).toExist(tempItemData.photoURI);
          expect(res.body.description).toEqual(tempItemData.description);
          expect(res.body.price).toEqual(tempItemData.price);
          expect(res.body._id).toExist(tempItemData._id);
        });
    });
  });

  describe('Testing PUT item route', () => {
    it('it should return with an updated item', () => {
      return superagent.put(`${API_URL}/item/${tempItemData._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('type', 'part')
        .field('name', 'Go to parts')
        .field('description', 'this is my updated description')
        .field('price', 40)
        .attach('file', `${__dirname}/temp-assets/testpicture.png`)
        .then(res => {
          expect(res.body.type).toEqual('part');
          expect(res.body.name).toEqual('Go to parts');
          expect(res.body.photoURI).toExist();
          expect(res.body.description).toEqual('this is my updated description');
          expect(res.body.price).toEqual(40);
          expect(res.body._id).toExist();
        });
    });
  });
  describe('Testing DELETE item route', () => {
    it('it should remove item', () => {
      return superagent.delete(`${API_URL}/item/${tempItemData._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });
});
