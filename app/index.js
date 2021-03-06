const express = require('express');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

//Data Sources
const MongoDS = require('./data-sources/mongoDS');

MongoDS.initialize();

//Routes
const usersRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bearerToken());

//Routes initialization
usersRoute(app);

//Not found route
app.use((request, response) => { response.status(404).send({ mensagem: "Não encontrado."}); });

module.exports = app;
