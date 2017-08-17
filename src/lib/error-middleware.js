'use strict';

//eslint-disable-next-line
module.exports = (err, req, res, next) => {
  console.error('hit EM:', err.message);

  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('unauthorized find one failed in basic auth middleware'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  if (err.message.toLowerCase().includes('no username or password'))
    return res.sendStatus(400);

  console.log('ERRRRR', err);
  res.sendStatus(500);
};
