'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CantonSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_canton: {type: String, required: true,unique: true},
    nombre_canton: {type: String, required: true},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('canton',CantonSchema);