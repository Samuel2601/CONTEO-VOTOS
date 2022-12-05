'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: false},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    dni: {type: String, required: true},
    rol: {type: String, required: true},
    estado: {type: String, required: true},
    config: {type: String, required: false},
});

module.exports =  mongoose.model('admin',AdminSchema);