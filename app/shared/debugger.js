const config = require('./config');
const debug = require('debug');

module.exports = (fileName) => debug(config.moduleName + ':' + fileName);