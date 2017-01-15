const HttpStatus        = require('http-status');
const Q                 = require('q');
const Users             = require('../../../models/users');
const UsersController   = require('../../../controllers/users');
const { expect }        = require('chai');
const Strings           = require('../../../shared/strings');
const debug             = require('../../../shared/debugger')('unitTest-controllers:users');
const jwt               = require('jwt-simple');
const config            = require('../../../shared/config');
const moment            = require('moment');
// const sinon             = require('sinon');

describe('Controllers: Users', () => {
    
    _usersController = UsersController(Users);

    describe('create()', () => {

        it('should exist and be a function', () => {
            expect(_usersController.create).to.exist;
            expect(_usersController.create).to.be.a('function');
        });

        it('should return an error message if nome is not passed', () => {
            
            const data = {
                email : "filipebotti@hotmail.com",
                senha : "senha",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
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
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.EMAIL_FIELD_NOT_FOUND)
                        });
        });

        it('should return an error message if email is not valid', () => {
            
            const data = {
                nome : "nome",
                senha : "senha",
                email: "email",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.EMAIL_FIELD_NOT_VALID)
                        });
        });

        it('should return an error message if senha is not passed', () => {
            
            const data = {
                nome : "nome",
                email: "filipebotti@hotmail.com",
                telefones: [{ numero: "123456", ddd: "85"}]
            };

            return _usersController
                        .create(data)
                        .then(result => {
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
                email: "filipebotti@hotmail.com",
                senha: "senha",
            };

            return _usersController
                        .create(data)
                        .then(result => {
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
                email: "filipebotti@hotmail.com",
                senha: "senha",
                telefones: []
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.TELEFONE_FIELD_AT_LEAST_ONE)
                        });
        });

        it('should return an error message if telefones are not valid', () => {
            const data = {
                nome : "nome",
                email: "filipebotti@hotmail.com",
                senha: "senha",
                telefones: [{ numero: "9898", ddd: "85"}]
            };
            
            return _usersController
                        .create(data)
                        .then(result => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.TELEFONE_FIELD_NOT_VALID)
                        });

        });
    });

    describe('auth()',() => {

        it('should exist and be a function', () => {

            expect(_usersController.auth).to.exist;
            expect(_usersController.auth).to.be.a('function');
        });

        it('should return an error message if email field is not passed', () => {

            return _usersController
                        .auth({})
                        .then((result) => {
                            
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');                            
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.EMAIL_FIELD_NOT_FOUND);
                        });
        });

        it('should return an error message if senha field is not passed', () => {

            const data = {
                email: "some@email.com"
            };

            return _usersController
                        .auth(data)
                        .then((result) => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);                            
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.SENHA_FIELD_NOT_FOUND);
                        });
        });

        it('should return an error message if no one user is found', sinon.test(function() {

            const data = {
                email: "email",
                senha: "senha"
            };

            this.mock(Users)
                .expects('findOne')                
                .chain('exec')
                .resolves(null);

            return _usersController
                        .auth(data)
                        .then((result) => {
                            
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.INVALID_CREDENTIALS);
                        });
        }));

        it('should return an error message if password not match', sinon.test(function() {

            const data = {
                email: "some@email.com",
                senha: "some#password"
            };

            const foundUser = {
                email: "some@email.com",
                senha: "D3BCEC7CE184C002B1CE7805CF36F333" //md5 for 123desafio
            };

            this.mock(Users)
                .expects('findOne')                
                .chain('exec')
                .resolves(foundUser);

            return _usersController
                        .auth(data)
                        .then((result) => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.INVALID_CREDENTIALS);
                        });


        }))
    });

    describe('getById()', () => {
        it("should exist and be a function", () => {        

            expect(_usersController.getById).to.exist;
            expect(_usersController.getById).to.be.a('function');
        });

        it("should return an error message if token in headers", () => {

            return _usersController
                        .getById({})
                        .then((result) => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.UNAUTHORIZED);
                        });
        });

        it("should return an error message if token is not valid", () => {

            const data ={
                token : "123token",
            };

            return _usersController
                        .getById(data)
                        .then((result) => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.UNAUTHORIZED);
                        });
        });

        it("should return an erro message if user not found", () => {
             const data = {
                 token: jwt.encode({ expirationTime: moment(new Date())}, config.jwtSecret),
                 id: "sampleid"
             };

             return _usersController
                        .getById(data)
                        .then((result) => {

                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);
                            expect(result.data).to.be.an('object');
                            expect(result.data.mensagem).to.be.a('string');
                            expect(result.data.mensagem).not.be.empty;
                            expect(result.data.mensagem).to.be.eql(Strings.USER_NOT_FOUND);
                        });
        })
    });

});