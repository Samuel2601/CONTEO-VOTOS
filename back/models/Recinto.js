'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecintoSchema = Schema({
    codigo_provincia:{type: Schema.ObjectId, ref: 'provincia', required: true},
    codigo_canton:{type: Schema.ObjectId, ref: 'canton', required: true},
    codigo_parroquia:{type: Schema.ObjectId, ref: 'parroquia', required: true},
    codigo_zona:{type: Schema.ObjectId, ref: 'zona', required: true},

    codigo_recinto:{type: String, required: true,unique: true},
    nombre_recinto:{type: String, required: true},
    direccion_recinto:{type: String, required: true},
    telefono:{type: String, required: true},
    zona_utm:{type: String, required: true},
    
    coord_x:{type: String, required: true},
    coord_y:{type: String, required: true},
    
    long:{type: String, required: true},
    lat:{type: String, required: true},

    u_r:{type: String, required: true},
    
    jun_fem:{type: String, required: true},
    jun_mas:{type: String, required: true},
    
    num_junr:{type: String, required: true},
    
    jun_inif:{type: String, required: true},
    jun_finf:{type: String, required: true},
    jun_inim:{type: String, required: true},
    jun_finm:{type: String, required: true},
    
    numero_electores:{type: String, required: true},

    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('recinto',RecintoSchema);