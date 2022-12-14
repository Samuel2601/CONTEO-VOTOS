import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";

import { FlatfileMethods, FlatfileResults, FlatfileSettings } from "@flatfile/angular";

declare var iziToast: {
	show: (arg0: {
		title: string;
		titleColor: string;
		color: string;
		class: string;
		position: string;
		message: string;
	}) => void;
};
declare var $: any;
@Component({
	selector: "app-index-distributivons",
	templateUrl: "./index-distributivons.component.html",
	styleUrls: ["./index-distributivons.component.css"]
})
export class IndexDistributivonsComponent implements OnInit, FlatfileMethods {
	public distributivons: Array<any> = [];
	public distributivons_const: Array<any> = [];
	public token = localStorage.getItem("token");
	public rol: any;
	public page = 1;
	public pageSize = 24;
	public filtro = "";
	public tipo_filtro = "";
	public load_eliminados = false;
	public load_data_est = true;
	private subir: Array<any> = [];
	public subidos = 0;
	public resubido=0;
	public errorneos=0;
	public mp='';
	public total=0;
	public resubidos=0;
	public resubidosc=0;
	public subidoss: any={};
	public errorneoss=0;
	public errorv=0;
	public cont_el=0;

	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		this.distributivons_const=[];
		this.distributivons=[];
		this.load_data_est = true;
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				
			this.rol = response.data.rol;
				this.recarga();
			}
		});

		

	}
	recarga(){
		//this.load_data_est=true;
		this.distributivons_const=[];
		this.distributivons=[];
		this._adminService.listar_distributivons(this.token).subscribe((response) => {
			console.log(response);

			this.distributivons_const = response.data;
			this.distributivons_const.forEach(element => {
				this.distributivons.push({ckechk:0,element});
			});
			console.log("");
			this.load_data_est = false;
		});
	}


	licenseKey = "88440965-79d0-4d6e-a58d-3df7053ba6dd";
	
	settings: FlatfileSettings = {
		type: "distributivons",

		fields: [
			{
				label: "codigo_provincia",
				key: "codigo_provincia",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "nombre_provincia",
				key: "nombre_provincia",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "codigo_canton",
				key: "codigo_canton",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "nombre_canton",
				key: "nombre_canton",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "codigo_parroquia",
				key: "codigo_parroquia",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "nombre_parroquia",
				key: "nombre_parroquia",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "codigo_zona",
				key: "codigo_zona",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "nombre_zona",
				key: "nombre_zona"
			},
			{
				label: "codigo_recinto",
				key: "codigo_recinto",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "nombre_recinto",
				key: "nombre_recinto",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "direccion_recinto",
				key: "direccion_recinto",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "telefono",
				key: "telefono",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "zona_utm",
				key: "zona_utm",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "codigo_provincia",
				key: "codigo_provincia",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "coord_x",
				key: "coord_x",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "coord_y",
				key: "coord_y",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "long",
				key: "long",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "lat",
				key: "lat",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "u_r",
				key: "u_r",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_fem",
				key: "jun_fem",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_mas",
				key: "jun_mas",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "num_junr",
				key: "num_junr",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_inif",
				key: "jun_inif",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_finf",
				key: "jun_finf",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_inim",
				key: "jun_inim",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "jun_finm",
				key: "jun_finm",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
			{
				label: "numero_electores",
				key: "numero_electores",
				validators: [{ validate: "required", error: "Obligatorio" }]
			},
		],

	};
	customer = { userId: "12345" };
	onData(results: FlatfileResults): Promise<string> {
		let errorState = false;
		////console.log({results});
		////console.log(results.validData.length);
		this.subir=results.validData;
		this.subir_distributivon();

		return new Promise((resolve, rejects) => {
			if (errorState) {
				rejects("reject -this text is controlled by the end-user");
				errorState = false;
			} else {
				resolve("Agregados con exito");
			}
			
		});
		
	}
	subir_distributivon(){
		this.load_data_est = true;
		this.subidoss={};
		this.resubidos=0;
		this.resubidosc=0;
		this.errorneoss=0;
		this.errorv=0;
	this._adminService
		.registro_distributivon_masivo(this.subir, this.token)
		.subscribe(
			(response) => {
					this.subidoss=response.s;
					this.resubidos=response.r;
					this.resubidosc=response.rc;
					this.errorneoss=response.e;
					this.errorv=response.ev;
					if(response.message==undefined){
						if(this.subidoss!=undefined){
							if(this.subidoss.provincia!=0){
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "iziToast-success",
									position: "topRight",
									message: "Pronvicias agregadas con exito (" + this.subidoss.provincias + ")"
								});
							}
							if(this.subidoss.canton!=0){
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "iziToast-success",
									position: "topRight",
									message: "Cantones agregados con exito (" + this.subidoss.canton + ")"
								});
							}
							if(this.subidoss.parroquia!=0){
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "iziToast-success",
									position: "topRight",
									message: "Parroquias agregadas con exito (" + this.subidoss.parroquia + ")"
								});
							}
							if(this.subidoss.zona!=0){
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "iziToast-success",
									position: "topRight",
									message: "Zonas agregadas con exito (" + this.subidoss.zona + ")"
								});
							}
							if(this.subidoss.recinto!=0){
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "iziToast-success",
									position: "topRight",
									message: "Recintos agregadas con exito (" + this.subidoss.recinto + ")"
								});
							}
							
						}
	
						if(this.resubidos!=0){
							iziToast.show({
								title: "INFO",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "iziToast-primary",
								position: "topRight",
								message: "Reactivado (" + this.resubidos + ")"
							});
						}
						if(this.resubidosc!=0){
							iziToast.show({
								title: "INFO",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "iziToast-info",
								position: "topRight",
								message: "Reactivado con pension existente(" + this.resubidosc + ")"
							});
						}
						if(this.errorneoss!=0){
							iziToast.show({
								title: "ADVERTENCIA",
								titleColor: "RED",
								color: "RED",
								class: "iziToast-warning",
								position: "topRight",
								message: "Distributivon ya existente"+ "(" + this.errorneoss + ")"
							});
						}
						if(this.errorv!=0){
							iziToast.show({
								title: "ERROR",
								titleColor: "RED",
								color: "RED",
								class: "iziToast-dannger",
								position: "topRight",
								message: "Fila con campo vacio"+ "(" + this.errorv + ")"
							});
						}
					}else{
						iziToast.show({
							title: "ERROR",
							titleColor: "RED",
							color: "RED",
							class: "iziToast-dannger",
							position: "topRight",
							message: response.message
						});
					}
					
					this.recarga();	
			});

	
	}

	filtrar_distributivon() {
		this.load_data_est = true;
		this.distributivons=[];
		var aux=this.filtro;
		if(this.tipo_filtro==''){
			this.tipo_filtro='item.element.codigo_provincia.codigo_provincia';
		}
		this.tipo_filtro=this.tipo_filtro.toString();
		//console.log(this.tipo_filtro);
		if (this.filtro) {
			this.filtro=this.filtro.toString();
			
			var term = new RegExp(this.filtro.toString().trim(), "i");
			//console.log(term);
			this.distributivons_const.forEach(element => {
					this.distributivons.push({ckechk:0,element});
			});
			
			switch(this.tipo_filtro){
				case 'item.element.codigo_provincia.codigo_provincia':

					this.distributivons = this.distributivons.filter(
						(item) =>
							parseFloat(this.filtro) == parseFloat(item.element.codigo_provincia.codigo_provincia)		
					);
				break;
				case 'item.element.codigo_provincia.nombre_provincia':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.codigo_provincia.nombre_provincia)		
					);
				break;
				case 'item.element.codigo_canton.codigo_canton':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.codigo_canton.codigo_canton)		
					);
				break;
				case 'item.element.codigo_canton.nombre_canton':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.codigo_canton.nombre_canton)		
					);
				break;
				case 'item.element.codigo_parroquia.codigo_parroquia':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.codigo_parroquia.codigo_parroquia)		
					);
				break;
				case 'item.element.codigo_parroquia.nombre_parroquia':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.codigo_parroquia.nombre_parroquia)		
					);
				break;
				case 'item.element.codigo_zona.codigo_zona':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.codigo_zona.codigo_zona)		
					);
				break;
				case 'item.element.codigo_zona.nombre_zona':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.codigo_zona.nombre_zona)		
					);
				break;
				case 'item.element.codigo_recinto':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.codigo_recinto)		
					);
				break;
				case 'item.element.nombre_recinto':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.nombre_recinto)		
					);
				break;
				case 'item.element.direccion_recinto':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.direccion_recinto)		
					);
				break;
				case 'item.element.telefono':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.telefono)		
					);
				break;
				case 'item.element.zona_utm':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.zona_utm)		
					);
				break;
				case 'item.element.coord_x':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.coord_x)		
					);
				break;
				case 'item.element.coord_y':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.coord_y)		
					);
				break;
				case 'item.element.long':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.long)		
					);
				break;
				case 'item.element.lat':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.lat)		
					);
				break;
				case 'item.element.u_r':
					this.distributivons = this.distributivons.filter(
						(item) =>
							term.test(item.element.u_r)		
					);
				break;
				case 'item.element.jun_fem':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_fem)		
					);
				break;
				case 'item.element.jun_mas':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_mas)		
					);
				break;case 'item.element.num_junr':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.num_junr)		
					);
				break;
				case 'item.element.jun_inif':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_inif)		
					);
				break;
				case 'item.element.jun_finf':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_finf)		
					);
				break;
				case 'item.element.jun_inimitem.element.jun_inim':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_inim)		
					);
				break;
				case 'item.element.jun_finm':
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.jun_finm)		
					);
				break;
				default:
					this.distributivons = this.distributivons.filter(
						(item) =>
						parseFloat(this.filtro) == parseFloat(item.element.numero_electores)		
					);
				break;
			}

		} else {
			
			this.distributivons_const.forEach(element => {
				this.distributivons.push({ckechk:0,element});
		});
		}
		this.filtro=aux;
		this.load_data_est = false;
	}
	eliminar(id: any) {
		this.load_data_est = true;
		//this.load_data_est=true;
		////console.log(id);
		this._adminService.eliminar_distributivon_admin(id, this.token).subscribe(
			(response) => {
				iziToast.show({
					title: "SUCCESS",
					titleColor: "#1DC74C",
					color: "#FFF",
					class: "iziToast-success",
					position: "topRight",
					message: response.message
				});

				$("#delete-" + id).modal("hide");
				$(".modal-backdrop").removeClass("show");

				this.recarga();
			},
			(error) => {
				////console.log(error);
			}
		);
	}
	contar_eliminado(){
		var con=0;
		this.cont_el=0;
		this.distributivons.forEach(element => {
			if(element.ckechk==1){
				this.cont_el++;
			}
		});
		//console.log(this.cont_el);
	}

	eliminar_todo() {
		this.load_data_est = true;
		var eliminar=[];
		//this.load_data_est=true;
		////console.log(id);
		var con=0;
		let ultimo=0;
		this.distributivons.forEach(element => {
			if(element.ckechk==1){
				eliminar.push(element.element);
			ultimo++;
			}
		});
		//console.log(ultimo);
		//console.log(eliminar);
		this._adminService.eliminar_distributivon_masivo(eliminar,this.token).subscribe((response)=>{
			var con = response.con;
			iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "iziToast-success",
				position: "topRight",
				message: "Se eliminó correctamente:"+'('+con.provincia+')'+" Provincias"
			});
			iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "iziToast-success",
				position: "topRight",
				message: "Se eliminó correctamente:"+'('+con.canton+')'+" Cantones"
			});iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "iziToast-success",
				position: "topRight",
				message: "Se eliminó correctamente:"+'('+con.parroquia+')'+" Parroquias"
			});
			iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "iziToast-success",
				position: "topRight",
				message: "Se eliminó correctamente:"+'('+con.zona+')'+" Zonas"
			});
			iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "iziToast-success",
				position: "topRight",
				message: "Se eliminó correctamente:"+'('+con.recinto+')'+" Recintos"
			});
			this.load_eliminados = false;
			this.ngOnInit();
		});
		
		$("#delete-todo").modal("hide");
		$(".modal-backdrop").removeClass("show");
		

	}
	select_todo(){
		if(this.total==1){
			this.distributivons.forEach((element:any) => {
				element.ckechk=0;
			});
		}else{
			this.distributivons.forEach((element:any) => {
				element.ckechk=1;
			});
		}
		
	}

}
