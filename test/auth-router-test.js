'use strict';

require('dotenv').config();
const superagent = require('superagent');
const expect = require('expect');
const server = require('../src/lib/server.js');

const username = Math.random().toString();

const API_URL = process.env.API_URL;

describe('testing user routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /admin/signup',() => {
    it('should respond with token', () => {
      return superagent.post(`${API_URL}/admin/signup`)
        .send({ username, password: '1234' })
        .then(res => {
          expect(typeof res.text).toBe('string');
        });
    });

    it('should respond with 400 status', () => {
      return superagent.post(`${API_URL}/admin/signup`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET /admin/login', () => {
    it('should respond with 200 status and token', () => {
      return superagent.get(`${API_URL}/admin/login`)
        .withCredentials()
        .auth(username, '1234')
        .then(res => {
          expect(res.status).toEqual(200);
          expect(typeof res.text).toBe('string');
        });
    });

    it('should respond with 400 status', () => {
      return superagent.get(`${API_URL}/admin/login`)
        .withCredentials()
        .auth(username, '12345')
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
