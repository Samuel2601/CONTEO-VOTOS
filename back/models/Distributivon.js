'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DistributivonSchema = Schema({
    codigo_provincia:{type: String, required: false},
    nombre_provincia:{type: String, required: false},
    
    codigo_canton:{type: String, required: false},
    nombre_canton:{type: String, required: false},
    
    codigo_parroquia:{type: String, required: false},
    nombre_parroquia:{type: String, required: false},
    
    codigo_zona:{type: String, required: false},
    nombre_zona:{type: String, required: false},
    
    codigo_recinto:{type: String, required: false},
    nombre_recinto:{type: String, required: false},
    direccion_recinto:{type: String, required: false},
    telefono:{type: String, required: false},
    zona_utm:{type: String, required: false},
    
    coord_x:{type: String, required: false},
    coord_y:{type: String, required: false},
    
    long:{type: String, required: false},
    lat:{type: String, required: false},

    u_r:{type: String, required: false},
    
    jun_fem:{type: String, required: false},
    jun_mas:{type: String, required: false},
    
    num_junr:{type: String, required: false},
    
    jun_inif:{type: String, required: false},
    jun_finf:{type: String, required: false},
    jun_inim:{type: String, required: false},
    jun_finm:{type: String, required: false},
    
    numero_electores:{type: String, required: false},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('distributivon',DistributivonSchema);