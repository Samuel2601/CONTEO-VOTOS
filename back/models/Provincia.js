'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProvinciaSchema = Schema({
    codigo_provincia: {type: String, required: true,unique: true},
    nombre_provincia: {type: String, required: true},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('provincia',ProvinciaSchema);