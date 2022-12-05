'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DvotacionSchema = Schema({

    votacion:{type: Schema.ObjectId, ref: 'votacion', required: true},
    codigo_dignidad:{type: Schema.ObjectId, ref: 'dignidad', required: true},
    conteo:{type: Number, required: false},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('dvotacion',DvotacionSchema);