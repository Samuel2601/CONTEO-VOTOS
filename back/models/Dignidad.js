'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DignidadSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_dignidad:{type: String, required: true,unique: true},
    nombre_dignidad:{type: String, required: true},
    seleccion:{type: String, required: true},
    partido:{type: String, required: true},
});

module.exports =  mongoose.model('dignidad',DignidadSchema);