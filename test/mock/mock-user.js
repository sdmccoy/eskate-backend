'use strict';

const faker = require('faker');
const User = require('../../src/model/user.js');

const mockUser = module.exports = {};

mockUser.mockOne = () => {
  let result = {};
  result.password = faker.internet.password();
  return new User({
    username: faker.internet.userName(),
  })
    .passwordHashCreate(result.password)
    .then(user => {
      result.user = user;
      return user.tokenCreate();
    })
    .then(token => {
      result.token = token;
      return result;
    });
};
