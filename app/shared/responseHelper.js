const Q             = require('q');
const HttpStatus    = require('http-status');
const Strings       = require('./strings');
const debug         = require('./debugger')('shared:responseHelper');

function defaultResponse(data, statusCode = HttpStatus.OK) {

    debug('status: %j - data: %j', statusCode, data); 
    return Q({ data, statusCode });
}

function errorResponse(mensagem, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {

    debug('error: %j', mensagem );
    if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR) {    
        
        mensagem = Strings.INTERNAL_SERVER_ERROR;
    }

    return defaultResponse({ mensagem }, statusCode);
}

module.exports = { defaultResponse, errorResponse };
