'use strict';

const {S3} = require('aws-sdk');
const s3 = new S3();

module.exports = (req) => {
  console.log('s3 delete req: ', req);
  s3.deleteObject({
    Bucket: process.env.AWS_BUCKET,
    Key: req,
  });
  return;
};
