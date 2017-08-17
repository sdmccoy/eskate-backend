'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const storeSettings = require('../model/store-settings.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');


const storeSettingsRouter = module.exports = new Router();

storeSettingsRouter.post('/store', bearerAuth, s3Upload('storeLogo'), (req, res, next) => {
  console.log('hit', req.body);
  new storeSettings({
    storeLogoURI: req.s3Data.Location,
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

storeSettingsRouter.get('/store', (req, res, next) => {
  storeSettings.find({})
    .then(store => res.json(store))
    .catch(next);
});

storeSettingsRouter.put('/store/:id', bearerAuth, s3Upload('storeLogo'),(req, res, next) => {
  console.log('%%%%', req.body);
  let options = {
    runValidators: true,
    new: true,
  };
  storeSettings.findByIdAndUpdate(req.params.id,
    {
      storeLogoURI: req.s3Data.Location,
      storeAddress: req.body.address,
      storePhoneNumber: req.body.phoneNumber,
      storeCity: req.body.city,
      storeState: req.body.state,
      storeZipCode: req.body.zipCode,
      storeAboutUs: req.body.aboutUs,
    },
    options)
    .then(store => res.json(store))
    .catch(next);
});
