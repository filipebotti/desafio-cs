const express = require('express');
const bodyParser = require('body-parser');

//Routes
const usersRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true}));

//Routes initialization
usersRoute(app);

//Not found route
app.use((request, response) => { response.status(404).send({ mensagem: "Não encontrado."}); });

module.exports = app;
