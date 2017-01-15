const config = {
    port: 4040,
    moduleName: 'desafio',
    dbInMongo: 'desafio_db',
	mongoIp: '127.0.0.1',
	mongoPort: '27017',
    jwtSecret: 'ZGVzQGYhb0NT'
};

config.mongoURL = "mongodb://" + config.mongoIp + ":" + config.mongoPort + "/" + config.dbInMongo;

module.exports = config;