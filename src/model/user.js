'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  tokenSeed: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.methods.passwordHashCreate = function(password) {
  return bcrypt.hash(password, 8)
    .then(hash => {
      this.passwordHash = hash;
      return this;
    });
};

userSchema.methods.passwordHashCompare = function(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then(isCorrect => {
      /* istanbul ignore next */
      if (isCorrect) return this;
      /* istanbul ignore next */
      throw new Error('Unauthorized password does not match');
    });
};

userSchema.methods.tokenSeedCreate = function (){
  return new Promise((resolve, reject) => {
    let tries = 1;

    const _tokenSeedCreate = () => {
      this.tokenSeed = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => {
          resolve(this);
        })
        .catch(() => {
          if (tries < 1) return reject(new Error('server failed to create tokenSeed'));
          tries--;
          _tokenSeedCreate();
        });
    };
    _tokenSeedCreate();
  });
};

userSchema.methods.tokenCreate = function() {
  return this.tokenSeedCreate()
    .then(() => jwt.sign({ tokenSeed: this.tokenSeed }, process.env.APP_SECRET));
};

const User = module.exports = mongoose.model('user', userSchema);

User.create = function(data){
  console.log('usercreate data:', data);
  const password = data.password;
  delete data.password;
  console.log('usercreate data noPW:', data);
  return new User(data).passwordHashCreate(password)
    .then(user => {
      console.log('user after create:', user);
      user.tokenCreate();
    });
};
