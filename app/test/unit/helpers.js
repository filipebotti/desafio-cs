const chai          = require('chai');
const mongoose      = require('mongoose');
const { Promise }   = require('q');


global.mongoose = mongoose; 
mongoose.Promise = Promise;