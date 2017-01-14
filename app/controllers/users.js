const HttpStatus        = require("http-status");
const Q                 = require('q');
const moment            = require('moment');
const Strings           = require('../shared/strings');
const debug             = require('../shared/debugger')('controllers: users');
const ResponseHelper    = require('../shared/responseHelper');

module.exports = (Users) => {

    function create(data) {

        debug(data);

        if(!data.nome)
            return ResponseHelper.errorResponse(Strings.NOME_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.email)
            return ResponseHelper.errorResponse(Strings.EMAIL_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.senha)
            return ResponseHelper.errorResponse(Strings.SENHA_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.telefones)
            return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.telefones.length == 0)
            return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_AT_LEAST_ONE, HttpStatus.BAD_REQUEST);
        


        const now = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");

        let user = {};
        user.id = "123";
        user.data_criacao = now;
        user.data_atualizacao = now;
        user.ultimo_login = now;
        user.token = "123";

        return ResponseHelper.defaultResponse(Object.assign({}, data, user), HttpStatus.CREATED);        
    }


    return { create };

};