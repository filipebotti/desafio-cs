const HttpStatus = require('http-status');
const Q = require('q');
const Users = require('../../../models/users');
const UsersController = require('../../../controllers/users');

describe('Controllers: Users', () => {
    
    _usersController = UsersController(Users);

    describe('create()', () => {

        it('should exist', () => {
            expect(_usersController.create).to.exist;
        });
    });

})