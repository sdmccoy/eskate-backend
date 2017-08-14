'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD

//configuring mongoose to conenct to db
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
=======
mongoose.connect(process.env.MDB_URI);
>>>>>>> 7dd0e20734352c350bd893e7e8223a100710c21a

const app = express();
app.use(morgan('dev'));
app.use(cors());


//load routes
app.use(require('../route/store-settings.js'));

//route to handle all unknown routes with code 404
app.all('/*', (req, res, next) => {
  res.sendStatus(404);
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
