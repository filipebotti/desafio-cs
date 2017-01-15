const Users = require('../../../models/users')
const { expect } = require('chai');

describe('Models: Users', () => {

    describe('generatePassword()', () => {

        it('should exist and be a function', () => {
            
            expect(Users.generatePassword).to.exist;
            expect(Users.generatePassword).to.be.a('function');
        });

        it('should return a md5 hashed password for a input string', () => {

            const password = Users.generatePassword('123desafio');

            expect(password).to.exist;
            expect(password).to.be.a('string');
            expect(password).to.be.eql('D3BCEC7CE184C002B1CE7805CF36F333'); //md5 for 123desafio
        });        
    });

    describe('isPasswordEqual()', () => {

        it('should exist and be a function', () => {

            expect(Users.isPasswordEqual).to.exist;
            expect(Users.isPasswordEqual).to.be.a('function');
        });

        it('should return true if password match', () => {

            const value = "123desafio";
            const password = Users.generatePassword(value);

            const result = Users.isPasswordEqual(value, password);

            expect(result).to.be.a('boolean');
            expect(result).to.be.true;
        });
    });
});