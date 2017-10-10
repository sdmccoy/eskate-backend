'use strict';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const corsOrigins = process.env.CORS_ORIGINS || 'http://www.e-skate.tech';

//configuring mongoose to conenct to db
mongoose.Promise = Promise;
mongoose.connect(process.env.MDB_URI);

const app = express();
app.use(morgan('dev'));
app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

app.use(require('../route/item-router.js'));
app.use(require('../route/auth-router'));
app.use(require('../route/store-settings'));

app.use(require('./error-middleware.js'));

app.all('/*', (req, res) => {
  res.sendStatus(404);
});

const server = module.exports = {};
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('\nserver is running on PORT ', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('\nserver is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false;
        console.log('server is down');
        resolve();
      });
    }
    reject(new Error('It seems like the server is off'));
  });
};
