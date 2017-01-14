const HttpStatus        = require('http-status');
const Q                 = require('q');
const Users             = require('../../../models/users');
const UsersController   = require('../../../controllers/users');
const { expect }        = require('chai');
const Strings           = require('../../../shared/strings');
const debug             = require('../../../shared/debugger')('unitTest-controllers:users');

describe('Controllers: Users', () => {
    
    _usersController = UsersController(Users);

    describe('create()', () => {

        it('should exist and be a function', () => {
            expect(_usersController.create).to.exist;
            expect(_usersController.create).to.be.a('function');
        });

        it('should return an error message if nome is not passed', () => {
            
            const data = {
                email : "email",
                senha : "senha",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            debug(result);
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.NOME_FIELD_NOT_FOUND)
                        });
        });

        it('should return an error message if email is not passed', () => {
            
            const data = {
                nome : "nome",
                senha : "senha",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            debug(result);
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.EMAIL_FIELD_NOT_FOUND)
                        });
        });

        it('should return an error message if senha is not passed', () => {
            
            const data = {
                nome : "nome",
                email: "email",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            debug(result);
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.SENHA_FIELD_NOT_FOUND)
                        });
        });

        it('should return an error message if telefones is not passed', () => {
            
            const data = {
                nome : "nome",
                email: "email",
                senha: "senha",
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            debug(result);
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.TELEFONE_FIELD_NOT_FOUND)
                        });
        });

        it('should return an error message if telefones dont have at least one', () => {
            
            const data = {
                nome : "nome",
                email: "email",
                senha: "senha",
                telefones: []
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            debug(result);
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.TELEFONE_FIELD_AT_LEAST_ONE)
                        });
        });
    });

})