const HttpStatus = require('http-status');
const Q = require('q');
const Users = require('../../../models/users');
const UsersController = require('../../../controllers/users');
const expect = require('chai').expect;
const Strings = require('../../../shared/strings');

describe('Controllers: Users', () => {
    
    _usersController = UsersController(Users);

    describe('create()', () => {

        it('should exist and be a function', () => {
            expect(_usersController.create).to.exist;
            expect(_usersController.create).to.be.a('function');
        });

        it('should return an error message if nome is not passed', () => {
            
            const data = {
                email : "email"
            };

            return _usersController
                        .create(data)
                        .then(result => {
                            expect(result.statusCode).to.exist;
                            expect(result.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
                            expect(result.data).to.be.an('object');
                            expect(result.data.error).to.be.a('string');
                            expect(result.data.error).not.be.empty;
                            expect(result.data.error).to.be.eql(Strings.NOME_FIELD_NOT_FOUND)

                        });
        });
    });

})