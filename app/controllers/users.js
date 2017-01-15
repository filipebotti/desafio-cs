const HttpStatus        = require("http-status");
const Q                 = require('q');
const moment            = require('moment');
const Strings           = require('../shared/strings');
const debug             = require('../shared/debugger')('controllers: users');
const ResponseHelper    = require('../shared/responseHelper');
const Utils             = require('../shared/utils');
const config            = require('../shared/config');
const jwt               = require('jwt-simple');

module.exports = (Users) => {

    function create(data) {

        debug(data);

        if(!data.nome)
            return ResponseHelper.errorResponse(Strings.NOME_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.email)
            return ResponseHelper.errorResponse(Strings.EMAIL_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!Utils.isValidEmail(data.email))
            return ResponseHelper.errorResponse(Strings.EMAIL_FIELD_NOT_VALID, HttpStatus.BAD_REQUEST);
        if(!data.senha)
            return ResponseHelper.errorResponse(Strings.SENHA_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.telefones)
            return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(data.telefones.length === 0)
            return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_AT_LEAST_ONE, HttpStatus.BAD_REQUEST);
        
        for(let i = 0; i < data.telefones.length; i++) {
            const telefone = data.telefones[i];

            if(!telefone.numero || !telefone.ddd)
                return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_NOT_VALID, HttpStatus.BAD_REQUEST);
            
            if(!Utils.isValidPhone(telefone.numero))
                return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_NOT_VALID, HttpStatus.BAD_REQUEST);

            if(telefone.ddd.length !== 2)
                return ResponseHelper.errorResponse(Strings.TELEFONE_FIELD_NOT_VALID, HttpStatus.BAD_REQUEST);

        }
        let now = moment(new Date());
        debug('now : %j', now);

        const tokenExpiration = now.add(30, 'minute');        
        debug('expirationTime: %j', tokenExpiration);

        let userToAdd = Object.assign({}, data);
        userToAdd.token = jwt.encode({ expirationTime: tokenExpiration}, config.jwtSecret);

        debug("user: %j", userToAdd);

        return Users
                .findOne({ email: data.email})
                .then(user => 
                    { 
                        debug("find one user: %j" , user);
                        if(user && user._id) 
                            return Q.reject({ mensagem: Strings.USER_ALREADY_EXISTS, statusCode: HttpStatus.BAD_REQUEST});

                        return Q();
                })                    
                .then(() => {
                    debug("create");
                    return Users.create(userToAdd);
                })
                .then(user => Users.findOne({ _id: user._id}, {senha: 0}))
                .then(user => ResponseHelper.defaultResponse(user, HttpStatus.CREATED))
                .catch(error => ResponseHelper.errorResponse(error.mensagem, error.statusCode));   
    }

    function auth(data) {

    }

    return { create, auth };

};