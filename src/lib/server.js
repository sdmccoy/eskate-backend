'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MDB_URI);

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(require('../route/item-route.js'));
app.use(require('../route/auth-router'));

app.all('/*', (req, res) => {
  res.sendStatus(402);
});



const server = module.exports = {};
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server is running on PORT ', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server is already running'));
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
