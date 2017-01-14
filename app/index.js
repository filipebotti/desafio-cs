const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '10m'}));
app.use(bodyParser.urlencoded({extended: true}));

//Not found route
app.use((request, response) => { response.status(404).send({ mensagem: "Não encontrado."}); });

module.exports = app;
