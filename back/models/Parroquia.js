'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParroquiaSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_canton:{type: Schema.ObjectId, ref: 'canton', required: true},
    
    codigo_parroquia: {type: String, required: true,unique: true},
    nombre_parroquia: {type: String, required: true},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('parroquia',ParroquiaSchema);