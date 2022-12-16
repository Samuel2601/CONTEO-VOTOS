'use strict'

var express = require('express');
var distributivonController = require('../controllers/DistributivonController');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/votaciones'});


api.post('/registro_distributivon_masivo',auth.auth,distributivonController.registro_distributivon_masivo);
api.get('/listar_distributivons',auth.auth,distributivonController.listar_distributivons);
api.post('/eliminar_distributivon_masivo',auth.auth,distributivonController.eliminar_distributivon_masivo);

api.post('/registro_dignidad',auth.auth,distributivonController.registro_dignidad);
api.put('/modificar_dignidad/:id',auth.auth,distributivonController.modificar_dignidad);
api.delete('/eliminar_dignidad/:id',auth.auth,distributivonController.eliminar_dignidad);
api.get('/listar_dignidad',auth.auth,distributivonController.listar_dignidad);
api.get('/obtener_dignidad/:id',auth.auth,distributivonController.obtener_dignidad);

api.get('/obtener_pronvicia/:id',auth.auth,distributivonController.obtener_dignidad);
api.get('/obtener_parroquia/:id',auth.auth,distributivonController.obtener_dignidad);
api.get('/obtener_canton/:id',auth.auth,distributivonController.obtener_dignidad);
api.get('/obtener_zona/:id',auth.auth,distributivonController.obtener_dignidad);
api.get('/obtener_recinto/:id',auth.auth,distributivonController.obtener_dignidad);

api.get('/listar_provincia',auth.auth,distributivonController.listar_provincia);
api.get('/listar_canton',auth.auth,distributivonController.listar_canton);
api.get('/listar_parroquia',auth.auth,distributivonController.listar_parroquia);
api.get('/listar_recinto',auth.auth,distributivonController.listar_recinto);
api.get('/listar_zona',auth.auth,distributivonController.listar_zona);

api.get('/listar_votacion',auth.auth,distributivonController.listar_votacion);

//LISTAR ESPECIFICAS
api.get('/listar_canton_pro/:id',auth.auth,distributivonController.listar_canton_pro);
api.get('/listar_parroquia_can/:id',auth.auth,distributivonController.listar_parroquia_can);
api.get('/listar_zona_parr/:id',auth.auth,distributivonController.listar_zona_parr);


api.get('/listar_dignidad_esp/:id',auth.auth,distributivonController.listar_dignidad_esp);
api.get('/listar_recinto_esp/:id',auth.auth,distributivonController.listar_recinto_esp);

api.get('/listar_votacion_esp_pro/:id',auth.auth,distributivonController.listar_votacion_esp_pro);
api.get('/listar_votacion_esp_can/:id',auth.auth,distributivonController.listar_votacion_esp_can);
api.get('/listar_votacion_esp_parr/:id',auth.auth,distributivonController.listar_votacion_esp_parr);
api.get('/listar_votacion_esp_zon/:id',auth.auth,distributivonController.listar_votacion_esp_zon);
api.get('/listar_votacion_esp_rec/:id',auth.auth,distributivonController.listar_votacion_esp_rec);

api.post('/registro_provincia',auth.auth,distributivonController.registro_provincia);
api.post('/registro_parroquia',auth.auth,distributivonController.registro_parroquia);
api.post('/registro_canton',auth.auth,distributivonController.registro_canton);
api.post('/registro_recinto',auth.auth,distributivonController.registro_recinto);
api.post('/registro_zona',auth.auth,distributivonController.registro_zona);

api.post('/registrar_votacion',[auth.auth,path],distributivonController.registrar_votacion);
api.post('/registro_dvotacion',auth.auth,path,distributivonController.registro_dvotacion);

api.get('/obtener_portada/:img',distributivonController.obtener_portada);
api.get('/obtener_portada_partido/:img',distributivonController.obtener_portada_partido);

api.get('/obtener_distributivon_guest/:id',auth.auth,distributivonController.obtener_distributivon_guest);

/*

api.post('/registro_distributivon_tienda',distributivonController.registro_distributivon_tienda);
api.get('/listar_distributivons_tienda',auth.auth,distributivonController.listar_distributivons_tienda);

api.get('/listar_votaciones_distributivons_tienda',auth.auth,distributivonController.listar_votaciones_distributivons_tienda);
api.get('/listar_dignidads_nuevos_publico',distributivonController.listar_dignidads_nuevos_publico);
api.post('/registro_distributivon',auth.auth,distributivonController.registro_distributivon);

api.post('/crear_pension_distributivon',distributivonController.crear_pension_distributivon);
api.post('/login_distributivon',distributivonController.login_distributivon);

api.get('/obtener_distributivon_guest/:id',auth.auth,distributivonController.obtener_distributivon_guest);
api.get('/obtener_pension_distributivon_guest/:id',auth.auth,distributivonController.obtener_pension_distributivon_guest);

api.put('/actualizar_distributivon_admin/:id',auth.auth,distributivonController.actualizar_distributivon_admin);
//api.post('/registro_direccion_distributivon',auth.auth,distributivonController.registro_direccion_distributivon);
//api.get('/obtener_direccion_todos_distributivon/:id',auth.auth,distributivonController.obtener_direccion_todos_distributivon);
//api.put('/cambiar_direccion_principal_distributivon/:id/:distributivon',auth.auth,distributivonController.cambiar_direccion_principal_distributivon);
//api.get('/eliminar_direccion_distributivon/:id',auth.auth,distributivonController.eliminar_direccion_distributivon);


//api.get('/listar_dignidads_publico',distributivonController.listar_dignidads_publico);
//api.get('/obtener_variedades_dignidads_distributivon/:id',distributivonController.obtener_variedades_dignidads_distributivon);
//api.get('/obtener_dignidads_slug_publico/:slug',distributivonController.obtener_dignidads_slug_publico);
//api.get('/listar_dignidads_recomendados_publico/:categoria',distributivonController.listar_dignidads_recomendados_publico);

//api.post('/agregar_carrito_distributivon',auth.auth,distributivonController.agregar_carrito_distributivon);
//api.get('/obtener_carrito_distributivon/:id',auth.auth,distributivonController.obtener_carrito_distributivon);
//api.delete('/eliminar_carrito_distributivon/:id',auth.auth,distributivonController.eliminar_carrito_distributivon);
api.get('/obtener_ordenes_distributivon/:id',auth.auth,distributivonController.obtener_ordenes_distributivon);
api.get('/obtener_detalles_ordenes_distributivon/:id',auth.auth,distributivonController.obtener_detalles_ordenes_distributivon);


api.get('/obtener_detalles_por_distributivon/:id',auth.auth,distributivonController.obtener_detalles_por_distributivon);


api.post('/comprobar_carrito_distributivon',auth.auth,distributivonController.comprobar_carrito_distributivon);
api.get('/consultarIDPago/:id',auth.auth,distributivonController.consultarIDPago);
api.post('/registro_compra_distributivon',auth.auth,distributivonController.registro_compra_distributivon);
api.get('/obtener_reviews_distributivon/:id',auth.auth,distributivonController.obtener_reviews_distributivon);
api.post('/enviar_mensaje_contacto',distributivonController.enviar_mensaje_contacto);
*/
module.exports = api;