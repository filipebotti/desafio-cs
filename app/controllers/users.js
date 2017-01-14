const HttpStatus = require("http-status");
const Q = require('q');
const moment = require('moment');
const Strings = require('../shared/strings');
const debug = require('../shared/debugger')('controllers: users');

module.exports = (Users) => {

    function create(data) {

        debug(data);

        if(!data.nome)
            return Q({ data: { mensagem: Strings.NOME_FIELD_NOT_FOUND}, statusCode: HttpStatus.BAD_REQUEST});

        const now = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

        let user = {};
        user.id = "123";
        user.data_criacao = now;
        user.data_atualizacao = now;
        user.ultimo_login = now;
        user.token = "123";

        return Q({ data: Object.assign({}, data, user), statusCode: HttpStatus.CREATED});
    }


    return { create };

};