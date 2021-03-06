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
        const tokenExpiration = now.add(30, 'minute');        

        let userToAdd = Object.assign({}, data);
        userToAdd.token = jwt.encode({ expirationTime: tokenExpiration}, config.jwtSecret);

        debug("user: %j", userToAdd);

        return Users
                .findOne({ email: data.email})
                .then(user => 
                    { 
                        debug("find one user: %j" , user);
                        if(user && user._id)
                            return ResponseHelper.errorResponse(Strings.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);                             

                        return Users.create(userToAdd)
                                .then(user => Users.findOne({ _id: user._id}, {senha: 0}))
                                .then(user => ResponseHelper.defaultResponse(user, HttpStatus.CREATED));
                })
                .catch(error => ResponseHelper.errorResponse(error));   
    }

    function auth(data) {

        if(!data.email)
            return ResponseHelper.errorResponse(Strings.EMAIL_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);
        if(!data.senha)
            return ResponseHelper.errorResponse(Strings.SENHA_FIELD_NOT_FOUND, HttpStatus.BAD_REQUEST);

        return Users
                .findOne({ email : data.email })
                .then(user => {
                    if(!user || !user._id || !Users.isPasswordEqual(data.senha, user.senha))
                        return ResponseHelper.errorResponse(Strings.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
                    
                    const tokenExpirationTime = moment(new Date()).add(30, 'minute');
                    user.token = jwt.encode({ expirationTime: tokenExpirationTime }, config.jwtSecret);
                    user.ultimo_login = moment(new Date());
                    user.data_atualizacao = user.ultimo_login;

                    return user.save()
                            .then(user => Users.findOne({ _id: user._id }, { senha: 0}))
                            .then(user => ResponseHelper.defaultResponse(user, HttpStatus.OK));                    
                        
                })
                .catch(error => ResponseHelper.errorResponse(error));
    }

    function getById(data) {

        if(!data.token)
            return ResponseHelper.errorResponse(Strings.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);        

        try {

            const decoded = jwt.decode(data.token, config.jwtSecret);
            return Users
                    .findOne({ _id : data.id}, { senha: 0})
                    .then(user => {
                        if(!user || !user._id)
                            return ResponseHelper.errorResponse(Strings.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
                        
                        if(user.token !== data.token)
                            return ResponseHelper.errorResponse(Strings.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

                        const now = moment(new Date());
                        const expirationTime = moment(decoded.expirationTime);
                        const diff = now.diff(expirationTime, 'minute');
                        debug("diff minutes: %j", diff);
                        if(diff < 30)
                            return ResponseHelper.defaultResponse(user, HttpStatus.OK);
                        else
                            return ResponseHelper.errorResponse(Strings.INVALID_SESSION, HttpStatus.UNAUTHORIZED);                        
                    })
                    .catch(error => ResponseHelper.errorResponse(error));

        }catch(error) {

            return ResponseHelper.errorResponse(Strings.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        
    }

    return { create, auth, getById };

};