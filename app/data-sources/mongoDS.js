const Q         = require('q');
const mongoose  = require('mongoose');
const config    = require('../shared/config');

function initialize() {
    
    //turn mongoose global
    global.mongoose = mongoose;

    mongoose.Promise = Q.Promise;

    mongoose.connect(config.mongoURL, function (error) {

        if(error)
            return console.error('Error when trying to connect to mongo: %s', error);

        console.log('Connected to mongo');

    });

}

module.exports = { initialize };