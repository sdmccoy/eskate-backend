'use strict';

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
  userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('order', orderSchema);
