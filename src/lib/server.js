'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();
app.use(morgan('dev'));
app.use(cors());

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
  return new Promise((resovle, reject) => {
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
