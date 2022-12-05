'use strict'

var express = require('express');
var AdminController = require('../controllers/AdminController');


var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/dignidads'});

api.post('/login_admin',AdminController.login_admin);
api.post('/login_candidato',AdminController.login_candidato);
api.get('/listar_registro',auth.auth,AdminController.listar_registro);
api.get('/listar_admin',auth.auth,AdminController.listar_admin);
api.put('/actualizar_admin/:id',auth.auth,AdminController.actualizar_admin);
api.put('/guardar_conf_admin/:id',auth.auth,AdminController.guardar_conf_admin);
api.post('/registro_admin',auth.auth,AdminController.registro_admin);
api.get('/obtener_admin/:id',auth.auth,AdminController.obtener_admin);
api.get('/eliminar_admin/:id',auth.auth,AdminController.eliminar_admin);
api.get('/verificar_token',auth.auth,AdminController.verificar_token);
/*
api.post('/registro_dignidad_admin',[auth.auth,path],AdminController.registro_dignidad_admin);
api.get('/listar_dignidads_admin',auth.auth,AdminController.listar_dignidads_admin);

api.get('/obtener_dignidad_admin/:id',auth.auth,AdminController.obtener_dignidad_admin);
api.put('/actualizar_dignidad_admin/:id',[auth.auth,path],AdminController.actualizar_dignidad_admin);


api.get('/obtener_config_admin',AdminController.obtener_config_admin);
api.put('/actualizar_config_admin',auth.auth,AdminController.actualizar_config_admin);

api.get('/obtener_votaciones_admin',auth.auth,AdminController.obtener_votaciones_admin);
api.get('/obtener_detallesvotaciones_admin',auth.auth,AdminController.obtener_detallesvotaciones_admin);

api.get('/obtener_detalles_ordenes_distributivon_abono/:id',auth.auth,AdminController.obtener_detalles_ordenes_distributivon_abono);
api.put('/marcar_finalizado_orden/:id',auth.auth,AdminController.marcar_finalizado_orden);
api.delete('/eliminar_orden_admin/:id',auth.auth,AdminController.eliminar_orden_admin);
api.delete('/eliminar_dignidad_admin/:id',auth.auth,AdminController.eliminar_dignidad_admin);

api.post('/registro_compra_manual_distributivon',auth.auth,AdminController.registro_compra_manual_distributivon);


api.get('/eliminar_distributivon_admin/:id',auth.auth,AdminController.eliminar_distributivon_admin);
api.get('/reactivar_distributivon_admin/:id',auth.auth,AdminController.reactivar_distributivon_admin);*/

module.exports = api;