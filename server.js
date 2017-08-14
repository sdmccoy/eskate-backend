'use strict';

!process.env.production && require('dotenv').config(); 
require('./src/lib/server.js').start();
