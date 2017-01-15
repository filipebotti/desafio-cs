const chai          = require('chai');
const mongoose      = require('mongoose');
const { Promise }   = require('q');
const sinon         = require('sinon');

require('sinon-as-promised');
require('sinon-mongoose');

global.sinon        = sinon;
global.mongoose     = mongoose; 

mongoose.Promise    = Promise;