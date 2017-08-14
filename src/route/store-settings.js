'use strict';

const {Router} = require('express');

const storeSettings = require('../model/store-settings.js');

const storeSettingsRouter = module.exports = new Router();

storeSettingsRouter.post('/store', (req, res, next) => {
  console.log('hit', req);
  new storeSettings({
    storePhoneNumber: req.body.phoneNumber,
    storeAddress: req.body.address,
    storeCity: req.body.city,
    storeState: req.body.state,
    storeZipCode: req.body.zipCode,
    storeAboutUs: req.body.aboutUs,
  })
    .save()
    .then(store => res.json(store))
    .catch(next);
});
