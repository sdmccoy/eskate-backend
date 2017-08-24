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
// let filePath = `${__dirname}/temp-assets/testpicture.png`;

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
          .set('Content-Type', 'image/png')
          .field('type', 'board')
          .field('name', 'Testing Mtn Board')
          .field('description', 'an amazing board')
          .field('price', 500)
          .field('motorPower', '50 wat')
          .field('maxSpeed', '35mph')
          .field('maxLoadCapacity', '300lb')
          .field('chargingTime', '4hrs')
          .field('wheelStyle', 'aluminum')
          .field('batteryCapacity', '100wat')
          .field('transmission', 'dual belt')
          .field('remote', 'trigger')
          .field('autoPowerShutOff', 'yes')
          .field('truckStyle', 'long')
          .field('weight', '30lb')
          .field('length', '100cm')
          .field('width', '40cm')
          .field('height', '10cm')
          .field('climbingAngle', '20deg')
          .field('voltagePeak', '20v')
          .field('voltageWorking', '10v')
          .field('capacity', '50amp')
          .field('power', '400v')
          .field('cutOffVoltage', '40v')
          .field('maxDischargingCurrent', '30v')
          .field('maxContinuousDischargingAmperage', '15amp')
          .field('ratedDischargingAmperage', '10amp')
          .field('chargingCurrent', '12amp')
          .field('chargingVoltage', '25v')
          .field('runTime', '5hrs')
          .field('lifecycle', '800mah')
          .field('color', 'red')
          .field('turning', 'slow')
          .field('dualDrive', 'yes')
          .field('bec', 'bec what')
          .field('lipo', 'yes')
          .field('voltage', '55v')
          .field('feature', 'of course')
          .field('firmwareVersion', 'v 10')
          .field('parameters', 'all of the params')
          .field('continuousCurrent', '40amp')
          .field('burstCurrent', '60amp')
          .attach('file', `${__dirname}/temp-assets/testpicture.png`);
      }).then(res => {
        tempItemData = res.body;
        console.log('tempItemData: ', tempItemData);
        expect(res.body.type).toEqual('board');
        expect(res.body.name).toEqual('Testing Mtn Board');
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
      console.log('tempItemData: ', tempItemData);
      return superagent.get(`${API_URL}/item/${tempItemData._id}`)
        .then(res => {
          console.log('GET res.body: ', res.body);
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
      console.log('tempItemData: ', tempItemData);
      return superagent.put(`${API_URL}/item/${tempItemData._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('type', 'part')
        .field('name', 'Go to parts')
        .field('description', 'this is my updated description')
        .field('price', 40)
        .attach('file', `${__dirname}/temp-assets/testpicture.png`)
        .then(res => {
          console.log('PUT res.body: ', res.body);
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
      // console.log('tempItemData: ', tempItemData);
      return superagent.delete(`${API_URL}/item/${tempItemData._id}`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });
});
