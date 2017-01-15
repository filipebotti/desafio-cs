const Strings       = require('../shared/strings');
const Q             = require('q');
const moment        = require('moment');
const Guid          = require('guid');
const jsonSelect    = require('mongoose-json-select');
const crypto        = require('crypto');
const debug         = require('../shared/debugger')('models: users');

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: String,
        default: Guid.raw()
    },
    nome: {
        type: String,
        required: [true, Strings.NOME_FIELD_NOT_FOUND]
    },
    email: {
        type: String,
        required: [true, Strings.EMAIL_FIELD_NOT_FOUND]
    },
    senha: {
        type: String,
        required: [true, Strings.SENHA_FIELD_NOT_FOUND],
        set: (value) => { return generatePassword(value); },
    },
    telefones: {
        type:[],
        required: [true, Strings.TELEFONE_FIELD_NOT_FOUND]
    },
    data_criacao: {
        type: Date,
        default: new Date()
    },
    data_atualizacao: {
        type: Date,        
    },
    ultimo_login: {
        type: Date,
        default: new Date()
    },
    token: {
        type: String,
    }
});

schema.plugin(jsonSelect, '-__v');

function generatePassword(value) {

    return crypto.createHash('md5').update(value).digest('hex').toUpperCase();
}

schema.statics.generatePassword = generatePassword;
schema.statics.isPasswordEqual = function isPasswordEqual(password, hashedPassword) {

    return hashedPassword === generatePassword(password);
};

const Users = mongoose.model('users', schema);

module.exports = Users;
