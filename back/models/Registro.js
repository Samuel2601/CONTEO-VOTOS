'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSchema = Schema({
    admin: {type: Schema.ObjectId, ref: 'admin', required: true},
    tipo: {type: String, require: true},
    accion: {type: String, require: true},
    //geo: {type: String, require: true}, 
    descripcion: {type: String, require: true},
    anterior: {type: String, require: false}, 
    createdAt: {type:Date, default: Date.now, require: true},

    
});

module.exports =  mongoose.model('registro',RegistroSchema);