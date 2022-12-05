'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZonaSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_canton:{type: Schema.ObjectId, ref: 'canton', required: true},
    codigo_parroquia:{type: Schema.ObjectId, ref: 'parroquia', required: true},

    codigo_zona: {type: String, required: true,unique: true},
    nombre_zona: {type: String, required: false},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('zona',ZonaSchema);