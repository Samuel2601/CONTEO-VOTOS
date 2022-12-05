'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotacionSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_canton:{type: Schema.ObjectId, ref: 'canton', required: true},
    codigo_parroquia:{type: Schema.ObjectId, ref: 'parroquia', required: true},
    codigo_zona:{type: Schema.ObjectId, ref: 'zona', required: true},
    codigo_recinto:{type: Schema.ObjectId, ref: 'recinto', required: true},
    codigo_dignidad:{type: String, required: true},
    admin:{type: Schema.ObjectId, ref: 'admin', required: true},
    junta:{type: String, required: true},
    tipo_junta:{type: String, required: true},
    localizacion: {type: String, required: true},
    portada:{type: String, required: true},
    estado:{type: String, default:'Verificar', required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('votacion',VotacionSchema);