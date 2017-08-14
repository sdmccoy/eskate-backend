'use strict';

const mongoose = require('mongoose');

const storeSettingsSchema = mongoose.Schema({
  logoURI: {type: String},
  storeAddress: {type: String},
  storeCity: {type: String},
  storeState: {type: String},
  storeZipCode: {type: String},
  storeAboutUs: {type: String},
  storePhoneNumber: {type: String},
  storeHeroURI: [],
  storeHeroDescription: [],
});

module.exports = mongoose.model('storeSettings', storeSettingsSchema);
