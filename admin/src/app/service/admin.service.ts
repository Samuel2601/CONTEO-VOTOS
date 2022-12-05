import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
	providedIn: "root"
})
export class AdminService {
	public url;

	constructor(private _http: HttpClient) {
		this.url = GLOBAL.url;
	}
	registro_distributivon(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_distributivon", data, { headers: headers });
	}
	registro_distributivon_masivo(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_distributivon_masivo", data, { headers: headers });
	}
	
	registro_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_admin", data, { headers: headers });
	}
	obtener_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_admin/" + id, { headers: headers });
	}
	actualizar_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "actualizar_admin/" + id, data, {
			headers: headers
		});
	}
	guardar_conf_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "guardar_conf_admin/" + id, data, {
			headers: headers
		});
	}
	eliminar_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "eliminar_admin/" + id, { headers: headers });
	}

	eliminar_distributivon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "eliminar_distributivon_admin/" + id, {
			headers: headers
		});
	}
	reactivar_distributivon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "reactivar_distributivon_admin/" + id, {
			headers: headers
		});
	}

	crear_pension_distributivon(data: any): Observable<any> {
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.post(this.url + "crear_pension_distributivon", data, {
			headers: headers
		});
	}

	login_admin(data: any): Observable<any> {
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.post(this.url + "login_admin", data, { headers: headers });
	}
	login_candidato(data: any): Observable<any> {
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.post(this.url + "login_candidato", data, { headers: headers });
	}

	listar_distributivons_tienda(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_distributivons_tienda", { headers: headers });
	}

	listar_distributivons(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_distributivons", {
			headers: headers
		});
	}
	
	listar_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_admin", { headers: headers });
	}
	listar_registro(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_registro", { headers: headers });
	}

	obtener_distributivon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_distributivon_admin/" + id, {
			headers: headers
		});
	}

	actualizar_distributivon_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "actualizar_distributivon_admin/" + id, data, {
			headers: headers
		});
	}

	get_categorias(): Observable<any> {
		return this._http.get("./assets/categorias.json");
	}

	listar_etiquetas_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_etiquetas_admin", { headers: headers });
	}

	eliminar_etiqueta_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_etiqueta_admin/" + id, {
			headers: headers
		});
	}

	agregar_etiqueta_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "agregar_etiqueta_admin", data, {
			headers: headers
		});
	}


	registro_dignidad(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_dignidad", data, { headers: headers });
	}
	

	obtener_dignidad_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_dignidad_admin/" + id, {
			headers: headers
		});
	}

	listar_etiquetas_dignidad_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_etiquetas_dignidad_admin/" + id, {
			headers: headers
		});
	}

	eliminar_etiqueta_dignidad_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_etiqueta_dignidad_admin/" + id, {
			headers: headers
		});
	}

	agregar_etiqueta_dignidad_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "agregar_etiqueta_dignidad_admin", data, {
			headers: headers
		});
	}

	registrar_votacion(data:any,file:any,token:any):Observable<any>{
		let headers = new HttpHeaders({'Authorization':token});
		const fd = new FormData();
		fd.append('codigo_canton',data.codigo_canton);
		fd.append('codigo_dignidad',data.codigo_dignidad);
		fd.append('codigo_parroquia',data.codigo_parroquia);
		fd.append('codigo_provincia',data.codigo_provincia);
		fd.append('codigo_recinto',data.codigo_recinto);
		fd.append('codigo_zona',data.codigo_zona);
		
		fd.append('junta',data.junta);
		fd.append('tipo_junta',data.tipo_junta);
		fd.append('localizacion',data.localizacion);
		fd.append('admin',data.admin);
		fd.append('portada',file);
		fd.append('contador',data.contador);
		//console.log(data.contador);
		//console.log("FD",fd);
		return this._http.post(this.url+'registrar_votacion',fd,{headers:headers});
	  }


	modificar_dignidad(data: any, id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(
			this.url + "modificar_dignidad/" + id,
			data,
			{ headers: headers }
		);
	}

	eliminar_variedad_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_variedad_admin/" + id, {
			headers: headers
		});
	}

	agregar_nueva_variedad_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "agregar_nueva_variedad_admin", data, {
			headers: headers
		});
	}
	obtener_ip_admin():Observable<any>{
		return this._http.get('https://api.ipify.org/?format=json');
	  }
	  obtener_data_admin(ip:any):Observable<any>{
		return this._http.get('https://ipapi.co/'+ip+'/json');
	  }




	agregar_imagen_galeria_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({ Authorization: token });

		const fd = new FormData();
		fd.append("_id", data._id);
		fd.append("imagen", data.imagen);
		return this._http.put(this.url + "agregar_imagen_galeria_admin/" + id, fd, {
			headers: headers
		});
	}

	eliminar_imagen_galeria_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "eliminar_imagen_galeria_admin/" + id, data, {
			headers: headers
		});
	}

	verificar_token(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "verificar_token", { headers: headers });
	}

	registro_cupon_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_cupon_admin", data, { headers: headers });
	}

	listar_cupones_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_cupones_admin", { headers: headers });
	}

	obtener_cupon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_cupon_admin/" + id, { headers: headers });
	}

	actualizar_cupon_admin(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "actualizar_cupon_admin/" + id, data, {
			headers: headers
		});
	}

	eliminar_cupon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_cupon_admin/" + id, {
			headers: headers
		});
	}



	obtener_config_admin(): Observable<any> {
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.get(this.url + "obtener_config_admin", { headers: headers });
	}

	actualizar_config_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "actualizar_config_admin", data, {
			headers: headers
		});
	}

	isAuthenticate() {
		const token: any = localStorage.getItem("token");

		try {
			const helper = new JwtHelperService();
			var decodedToken = helper.decodeToken(token);

			if (!token) {
				localStorage.clear();
				return false;
			}

			if (!decodedToken) {
				localStorage.clear();
				return false;
			}

			if (helper.isTokenExpired(token)) {
				localStorage.clear();
				return false;
			}
		} catch (error) {
			//console.log(error);

			localStorage.clear();
			return false;
		}

		return true;
	}

	obtener_votaciones_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_votaciones_admin", { headers: headers });
	}
	obtener_detallesvotaciones_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_detallesvotaciones_admin", { headers: headers });
	}

	obtener_detalles_ordenes_distributivon_abono(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_detalles_ordenes_distributivon_abono/" + id, {
			headers: headers
		});
	}
	obtener_detalles_ordenes_distributivon(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_detalles_ordenes_distributivon/" + id, {
			headers: headers
		});
	}

	obtener_detalles_por_distributivon(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_detalles_por_distributivon/" + id, {
			headers: headers
		});
	}

	obtenerPago(id: any): Observable<any> {
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json")
			.set(
				"Authorization",
				"Bearer TEST-1565437970717712-100416-3da5767dad6b8dfef6c0563925dadf81-612621626"
			);
		return this._http.get("https://api.mercadopago.com/v1/payments/" + id, {
			headers: headers
		});
	}

	marcar_finalizado_orden(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "marcar_finalizado_orden/" + id, data, {
			headers: headers
		});
	}

	eliminar_orden_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_orden_admin/" + id, {
			headers: headers
		});
	}
	eliminar_dignidad(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_dignidad/" + id, {
			headers: headers
		});
	}

	marcar_envio_orden(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "marcar_envio_orden/" + id, data, {
			headers: headers
		});
	}

	confirmar_pago_orden(id: any, data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.put(this.url + "confirmar_pago_orden/" + id, data, {
			headers: headers
		});
	}

	obtener_direccion_todos_distributivon(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_direccion_todos_distributivon/" + id, {
			headers: headers
		});
	}

	registro_compra_manual_distributivon(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_compra_manual_distributivon", data, {
			headers: headers
		});
	}

	listar_dignidad_dignidads_admin(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_dignidad_dignidads_admin", {
			headers: headers
		});
	}
	listar_dignidad(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_dignidad", { headers: headers });
	}
	obtener_dignidad(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_dignidad/" + id, { headers: headers });
	}
	obtener_pronvicia(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_pronvicia/" + id, { headers: headers });
	}
	obtener_parroquia(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_parroquia/" + id, { headers: headers });
	}
	obtener_canton(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_canton/" + id, { headers: headers });
	}
	obtener_zona(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_zona/" + id, { headers: headers });
	}
	obtener_recinto(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_recinto/" + id, { headers: headers });
	}

	listar_provincia(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_provincia", { headers: headers });
	}
	listar_canton(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_canton", { headers: headers });
	}
	listar_parroquia(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_parroquia", { headers: headers });
	}
	listar_recinto(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_recinto", { headers: headers });
	}
	listar_zona(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_zona", { headers: headers });
	}
	listar_votacion(token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion", { headers: headers });
	}
	//LISTAR ESPECIFICO
	listar_canton_pro(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_canton_pro/" + id, { headers: headers });
	}
	listar_parroquia_can(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_parroquia_can/" + id, { headers: headers });
	}
	listar_zona_parr(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_zona_parr/" + id, { headers: headers });
	}
	listar_dignidad_esp(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_dignidad_esp/" + id, { headers: headers });
	}
	listar_recinto_esp(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_recinto_esp/" + id, { headers: headers });
	}
	listar_votacion_esp_pro(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion_esp_pro/" + id, { headers: headers });
	}listar_votacion_esp_can(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion_esp_can/" + id, { headers: headers });
	}listar_votacion_esp_parr(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion_esp_parr/" + id, { headers: headers });
	}listar_votacion_esp_zon(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion_esp_zon/" + id, { headers: headers });
	}listar_votacion_esp_rec(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "listar_votacion_esp_rec/" + id, { headers: headers });
	}


	eliminar_distributivon_masivo(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "eliminar_distributivon_masivo", data, { headers: headers });
	}
	registro_provincia(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_provincia", data, { headers: headers });
	}
	registro_parroquia(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_parroquia", data, { headers: headers });
	}
	registro_canton(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_canton", data, { headers: headers });
	}
	registro_recinto(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_recinto", data, { headers: headers });
	}
	registro_zona(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_zona", data, { headers: headers });
	}

}
