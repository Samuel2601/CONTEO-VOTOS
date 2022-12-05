import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { GLOBAL } from "src/app/service/GLOBAL";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-edit-dignidad",
	templateUrl: "./edit-dignidad.component.html",
	styleUrls: ["./edit-dignidad.component.css"]
})
export class EditDignidadComponent implements OnInit {
	public id = "";
	public load_data = false;
	public dignidad: any = {
		categoria: "",
		visibilidad: ""
	};
	public imgSelect: any | ArrayBuffer = "assets/img/01.jpg";
	public categorias: Array<any> = [];
	public config: any = {};
	public load_btn = false;
	public file: any = undefined;

	public arr_etiquetas: Array<any> = [];
	public token = localStorage.getItem("token");
	public new_etiqueta = "";
	public load_data_etiqueta = false;
	public etiquetas: Array<any> = [];
	public load_etiquetas = false;
	public url = GLOBAL.url;
	public provincia: any[];
	rol: any;
	yo: number;

	constructor(
		private _adminService: AdminService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.config = {
			height: 500
		};
	}

	ngOnInit(): void {

		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
					this.yo = 1;
				}
				//////console.log(this.yo);
				this._route.params.subscribe((params) => {
					this.id = params["id"];
					
					//console.log(this.id);
					this.load_data = true;
					this._adminService.obtener_dignidad(this.id, this.token).subscribe(
						(response) => {
							
							if (response.data == undefined) {
								this.load_data = false;
								this.dignidad = undefined;
								
							} else {
								this.load_data = false;
								this.dignidad = response.data;
								this._adminService.listar_provincia(this.token).subscribe((response)=>{
									this.provincia=[];
									this.provincia=response.data;
									//console.log(response.data);
								});
							}
						},
						(error) => {
							//console.log(error);
						}
					);
				});
			}
			
		});
		
	}

	actualizar(actualizarForm: any) {
		if (actualizarForm.valid) {
			this.load_btn = true;

			this._adminService.modificar_dignidad(this.dignidad, this.id, this.token).subscribe(
				(response) => {
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: response.message
					});

					this.load_btn = false;

					this._router.navigate(["/dignidads"]);
				},
				(error) => {
					this.load_btn = false;
				}
			);
		} else {
			iziToast.show({
				title: "ERROR",
				titleColor: "#FF0000",
				color: "#FFF",
				class: "text-danger",
				position: "topRight",
				message: "Los datos del formulario no son validos"
			});
			this.load_btn = false;
		}
	}
}
