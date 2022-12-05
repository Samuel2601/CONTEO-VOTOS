import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class DistributivonService {
	public url;

	constructor(private _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	listar_distributivons_filtro_admin(tipo: any, filtro: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(
			this.url + "listar_distributivons_filtro_admin/" + tipo + "/" + filtro,
			{ headers: headers }
		);
	}

	registro_distributivon_admin(data: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.post(this.url + "registro_distributivon_admin", data, {
			headers: headers
		});
	}

	obtener_distributivon_guest(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_distributivon_guest/" + id, {
			headers: headers
		});
	}
	obtener_pension_distributivon_guest(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.get(this.url + "obtener_pension_distributivon_guest/" + id, {
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

	eliminar_distributivon_admin(id: any, token: any): Observable<any> {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: token
		});
		return this._http.delete(this.url + "eliminar_distributivon_admin/" + id, {
			headers: headers
		});
	}
}
