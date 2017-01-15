const Users = require('../../../models/users')
const { expect } = require('chai');

describe('Models: Users', () => {

    describe('generatePassword()', () => {

        it('should exist and be a function', () => {
            
            expect(Users.generatePassword).to.exist;
            expect(Users.generatePassword).to.be.a('function');
        });
    });
});