'use strict';

const faker = require('faker');
const Item = require('../../src/model/item.js');

const mockItem = module.exports = {};

mockItem.mockOne = () => {
  return new Item({
    type: 'board',
    name: 'Temp board',
    photoURI: faker.image.sports(),
    description: faker.lorem.sentences(),
    price: faker.finance.amount(),
    maxSpeed: '500mph',
    maxLoadCapacity: '250lbs',
    chargingTime: '2hrs',
  });
};
