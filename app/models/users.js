const Strings   = require('../shared/strings');
const Q         = require('q');
const moment    = require('moment');

const Schema = mongoose.Schema;

const schema = new Schema({
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
        required: [true, Strings.SENHA_FIELD_NOT_FOUND]
    },
    telefone: {
        type:[Object],
        required: [true, Strings.TELEFONE_FIELD_NOT_FOUND]
    },
    data_criacao: {
        type: Date,
        default: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    },
    data_atualizacao: {
        type: Date,
    },
    ultimo_login: {
        type: Date,
        default: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    },
    token: {
        type: String,
    }
})