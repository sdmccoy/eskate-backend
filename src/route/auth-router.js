'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = new Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
    .then(token => {
      console.log(token);
      const cookieOptions = { maxAge: (7 * 24 * 60 * 60 * 1000) };
      res.cookie('Admin-Token', token, cookieOptions);
      res.send(token);
    })
    .catch(next);
});
