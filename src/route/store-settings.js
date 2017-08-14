'use strict';

const {Router} = require('express');

const storeSettings = require('../model/store-settings.js');

const storeSettingsRouter = module.exports = new Router();

storeSettingsRouter.post('/store', (req, res, next) => {
  console.log('hit', req.body);
  new storeSettings({
    storeAddress: req.body.address,
    storePhoneNumber: req.body.phoneNumber,
    storeCity: req.body.city,
    storeState: req.body.state,
    storeZipCode: req.body.zipCode,
    storeAboutUs: req.body.aboutUs,
  })
    .save()
    .then(store => res.json(store))
    .catch(next);
});
