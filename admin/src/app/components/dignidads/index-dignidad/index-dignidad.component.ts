import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";
import { GLOBAL } from "src/app/service/GLOBAL";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-index-dignidad",
	templateUrl: "./index-dignidad.component.html",
	styleUrls: ["./index-dignidad.component.css"]
})
export class IndexDignidadComponent implements OnInit {
	public dignidads: Array<any> = [];
	public dignidads_const: Array<any> = [];
	public token = localStorage.getItem("token");
	public page = 1;
	public pageSize = 24;
	public filtro = "";
	public rol: any;
	public load_btn_etiqueta = false;
	public load_data_etiqueta = false;
	public nueva_etiqueta = "";
	public etiquetas: Array<any> = [];
	public load_del_etiqueta = false;
	public load_btn = false;
	public load = false;
	public aux: any;
	public load_estado = false;
	public url = GLOBAL.url;
	public total=0;
	public load_data_doc=true;
	public yo: number;
	public tipo_filtro = "";
	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			this.rol = response.data.rol;
			this.aux = response.data.email;
			////console.log(this.rol);
		});
		this.init_data();
	}

	init_data() {
		this.dignidads=[];
		this.dignidads_const=[];
		this.load = true;
		this.load_data_doc=true;

		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
					this.yo = 1;
				}
				//////console.log(this.yo);
				this._adminService.listar_dignidad(this.token).subscribe((response) => {
					this.dignidads_const = response.data;
					//console.log(response.data);
					this.dignidads_const.forEach(element => {
							this.dignidads.push({ckechk:0,element});		
					});
					//this.dignidads = this.dignidads_const;
					this.load = false;
					this.load_data_doc=false;
				});
			}
			
		});

		
	}
	select_todo(){
		if(this.total==1){
			this.dignidads.forEach((element:any) => {
				element.ckechk=0;
			});
		}else{
			this.dignidads.forEach((element:any) => {
				element.ckechk=1;
			});
		}
		
	}
	eliminar_todo() {
		this.load_data_doc = true;
		//this.load_data_est=true;
		////console.log(id);
		var con=0;
		let ultimo=0;
		this.dignidads.forEach(element => {
			if(element.ckechk==1){
			ultimo++;
			}
		});
		//console.log(ultimo);
		this.dignidads.forEach((element:any) => {
			if(element.ckechk==1){
				this._adminService.eliminar_dignidad(element.element._id, this.token).subscribe(
					(response) => {
						con++;
						if(con==ultimo){
							iziToast.show({
								title: "SUCCESS",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "iziToast-success",
								position: "topRight",
								message: "Se eliminó correctamente el(los) dignidad."+'('+con+')'
							});
							this.total=0;
							$("#delete-todo").modal("hide");
							$(".modal-backdrop").removeClass("show");			
							this.init_data();
							
						}						
						//this.recarga();
					},
					(error) => {
						////console.log(error);
					}
				);
				}
		});
		
		

	}

	cambiar_tipo_filtro(tipo){
		this.tipo_filtro=tipo;
		this.filtro='';
	}
	filtrar_dignidad() {
		this.dignidads=[];
		var aux=this.filtro;
		if(this.tipo_filtro==''){
			this.tipo_filtro='codigo_dignidad';
		}

		if (this.filtro) {
			var term = new RegExp(this.filtro.toString().trim(), "i");
			this.dignidads_const.forEach(element => {
				this.dignidads.push({ckechk:0,element});		
			});

			switch(this.tipo_filtro){
				case 'codigo_provincia':

					this.dignidads = this.dignidads.filter(
						(item) =>
							parseFloat(this.filtro) == parseFloat(item.element.codigo_provincia.codigo_provincia)		
					);
				break;
				case 'codigo_dignidad':

					this.dignidads = this.dignidads.filter(
						(item) =>
							parseFloat(this.filtro) == parseFloat(item.element.codigo_dignidad)		
					);
				break;
				case 'nombre_dignidad':
					this.dignidads = this.dignidads.filter(
						(item) =>
							term.test(item.element.nombre_dignidad)		
					);
				break;
				case 'nombre_provincia':
					this.dignidads = this.dignidads.filter(
						(item) =>
						term.test(item.element.codigo_provincia.nombre_provincia)	
					);
				break;
				default:
					this.dignidads = this.dignidads.filter(
						(item) =>
						term.test(item.element.seleccion)	
					);
					break;
			}


		} else {
			this.dignidads_const.forEach(element => {
					this.dignidads.push({ckechk:0,element});		
			});
		}
	}
	eliminar(id: any) {
		////console.log(id);
		this._adminService.eliminar_dignidad(id, this.token).subscribe(
			(response) => {
				if (response.message == "Eliminado con exito") {
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: response.message
					});
				} else {
					iziToast.show({
						title: "DANGER",
						titleColor: "RED",
						color: "RED",
						class: "text-success",
						position: "topRight",
						message: response.message
					});
				}

				$("#delete-" + id).modal("hide");
				$(".modal-backdrop").removeClass("show");

				this.ngOnInit();
			},
			(error) => {
				////console.log(error);
			}
		);
	}
}
