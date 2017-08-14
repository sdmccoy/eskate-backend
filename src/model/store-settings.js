'use strict';

const mongoose = require('mongoose');

const storeSettingsSchema = mongoose.Schema({
  storeAddress: {type: String},
  storeCity: {type: String},
  storeState: {type: String},
  storeZipCode: {type: String},
  storeAboutUs: {type: String},
  storePhoneNumber: {type: String},
});

module.exports = mongoose.model('storeSettings', storeSettingsSchema);
