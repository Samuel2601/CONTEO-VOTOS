import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";
import { GLOBAL } from 'src/app/service/GLOBAL';
declare var $: any;
declare var iziToast: any;

@Component({
	selector: "app-index-votaciones",
	templateUrl: "./index-votaciones.component.html",
	styleUrls: ["./index-votaciones.component.css"]
})
export class IndexVotacionesComponent implements OnInit {
	public votaciones: Array<any> = [];
	public votaciones_const: Array<any> = [];
	public total_monto: Array<any> = [];
	public auxtotal = 0;
	public const_votaciones: Array<any> = [];
	public token = localStorage.getItem("token");
	public page = 1;
	public pageSize = 24;
	public filtro = "";
	public desde: any = undefined;
	public hasta: any = undefined;
	public load = false;
	public rol: any;
	public aux: any;
	public total=0;
	public url = GLOBAL.url;
	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		this.votaciones=[];
		this.votaciones_const=[];
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				this.aux = response.data.email;
				//console.log(this.rol);
				if(this.rol=='admin'){
					this.recarga();
				}
			}
			
		});
		
	}
	recarga(){
		this.auxtotal = 0;
		this.load = true;
		this._adminService.listar_votacion(this.token).subscribe((response) => {
			this.votaciones_const = response.data;
			//console.log(response.data);
			this.votaciones_const.forEach(element => {
				this.votaciones.push({ckechk:0,element});		
			});
			//console.log(this.votaciones_const);
			this.votaciones.forEach((element: any) => {
				
			});
			//this.const_votaciones = this.votaciones;
			this.load = false;
		});
		// this.auxtotal=parseFloat(this.auxtotal.toFixed(2));
	}

	filtrar_votaciones() {
		this.auxtotal = 0;
		if (this.filtro) {
			var term = new RegExp(this.filtro.toString().trim(), "i");
			this.votaciones_const.forEach(element => {
				this.votaciones.push({ckechk:0,element});		
			});
			this.votaciones = this.votaciones.filter(
				(item) =>
					term.test(item.element._id) ||
					term.test(item.element.distributivon.nombres) ||
					term.test(item.element.distributivon.apellidos) ||
					term.test(item.element.dni)
			);
			this.votaciones.forEach((element: any) => {
				this.auxtotal = element.element.total_pagar + this.auxtotal;
			});
		} else {
			this.votaciones_const.forEach(element => {
				this.votaciones.push({ckechk:0,element});		
			});
			this.votaciones.forEach((element: any) => {
				this.auxtotal = element.element.total_pagar + this.auxtotal;
			});
		}
		//this.auxtotal=parseFloat(this.auxtotal.toFixed(2));
	}
	select_todo(){
		if(this.total==1){
			this.votaciones.forEach((element:any) => {
				element.ckechk=0;
			});
		}else{
			this.votaciones.forEach((element:any) => {
				element.ckechk=1;
			});
		}
		
	}

	filtrar_fechas() {
		if (this.desde || this.hasta) {
			this.votaciones = [];
			let tt_desde = Date.parse(new Date(this.desde + "T00:00:00").toString()) / 1000;
			let tt_hasta = Date.parse(new Date(this.hasta + "T23:59:59").toString()) / 1000;
			this.auxtotal = 0;
			for (var item of this.const_votaciones) {
				var tt_created = Date.parse(new Date(item.createdAt).toString()) / 1000;
				if (tt_created >= tt_desde && tt_created <= tt_hasta) {
					this.votaciones.push({ckechk:0,item});
					this.auxtotal = 0;
					this.votaciones.forEach((element: any) => {
						this.auxtotal = element.element.total_pagar + this.auxtotal;
					});
				}
			}
			////console.log(this.votaciones);
		} else {
			this.auxtotal = 0;
			this.votaciones_const.forEach(element => {
				this.votaciones.push({ckechk:0,element});		
			});
			this.votaciones.forEach((element: any) => {
				this.auxtotal = element.element.total_pagar + this.auxtotal;
			});
		}
		// this.auxtotal=parseFloat(this.auxtotal.toFixed(2));
	}

	reset_data() {
		this.auxtotal = 0;
		this.desde = "";
		this.hasta = "";
		this.filtro=null;
		this.recarga();
	}

	eliminar(id: any) {
		////console.log(id);
		this._adminService.eliminar_orden_admin(id, this.token).subscribe(
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
	eliminar_todo() {
		this.load = true;
		//this.load_data_est=true;
		////console.log(id);
		var con=0;
		let ultimo=0;
		this.votaciones.forEach(element => {
			if(element.ckechk==1){
			ultimo++;
			}
		});
		//console.log(ultimo);
		this.votaciones.forEach((element:any) => {
			if(element.ckechk==1){
				this._adminService.eliminar_orden_admin(element.element._id, this.token).subscribe(
					(response) => {
						con++;
						if(con==ultimo){
							iziToast.show({
								title: "SUCCESS",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "iziToast-success",
								position: "topRight",
								message: "Se eliminó correctamente el(los) pago."+'('+con+')'
							});
							this.total=0;
							$("#delete-todo").modal("hide");
							$(".modal-backdrop").removeClass("show");			
							this.ngOnInit();
							
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
}
