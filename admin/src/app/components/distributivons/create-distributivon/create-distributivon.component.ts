import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { DistributivonService } from "src/app/service/distributivon.service";
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


@Component({
	selector: "app-create-distributivon",
	templateUrl: "./create-distributivon.component.html",
	styleUrls: ["./create-distributivon.component.css"]
})
export class CreateDistributivonComponent implements OnInit {
	
	public distributivon: any = {
		genero: "No definido",
		password: "1234"
	};

	public token;
	public load_btn = false;
	public load_beca: any;
	public valores_votaciones = 0;
	public rol=undefined;
	public yo=0;

	public arr_provincia:Array<any>=[];
	public arr_parroquia:Array<any>=[];
	public arr_canton:Array<any>=[];
	public arr_recinto:Array<any>=[];
	public arr_zona:Array<any>=[];

	public c_arr_provincia:Array<any>=[];
	public c_arr_parroquia:Array<any>=[];
	public c_arr_canton:Array<any>=[];
	public c_arr_recinto:Array<any>=[];
	public c_arr_zona:Array<any>=[];

	public load_provincia=false;
	public load_parroquia=false;
	public load_canton=false;
	public load_recinto=false;
	public load_zona=false;

	public new_provincia: any = {};
	public new_parroquia: any = {};
	public new_canton: any = {};
	public new_recinto: any = {};
	public new_zona: any = {};
	public tp='Provincia';
	constructor(
		private _distributivonService: DistributivonService,
		private _adminService: AdminService,
		private _router: Router
	) {
		this.token = localStorage.getItem("token");
	}

	ngOnInit(): void {
		this.arr_provincia=[];
		this.arr_parroquia=[];
		this.arr_canton=[];
		this.arr_recinto=[];
		this.arr_zona=[];

		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
					this.yo = 1;
				}
				(function () {
					"use strict";
		
					// Fetch all the forms we want to apply custom Bootstrap validation styles to
					var forms = document.querySelectorAll(".needs-validation");
		
					// Loop over them and prevent submission
					Array.prototype.slice.call(forms).forEach(function (form) {
						form.addEventListener(
							"submit",
							function (event: { preventDefault: () => void; stopPropagation: () => void }) {
								if (!form.checkValidity()) {
									event.preventDefault();
									event.stopPropagation();
								}
		
								form.classList.add("was-validated");
							},
							false
						);
					});
				})();
				this.tiponav('Provincia');
				this.llamada();
			}
			
			//////console.log(this.yo);
		});

		
	}
	llamada(){
		this._adminService.listar_provincia(this.token).subscribe((response)=>{
			if(response.data!=undefined){
				this.c_arr_provincia=response.data;
				this.arr_provincia=this.c_arr_provincia;
			}
		});
		this._adminService.listar_canton(this.token).subscribe((response)=>{
			if(response.data!=undefined){
				this.c_arr_canton=response.data;
				this.arr_canton=this.c_arr_canton;
			}
		});
		this._adminService.listar_parroquia(this.token).subscribe((response)=>{
			if(response.data!=undefined){
				this.c_arr_parroquia=response.data;
				this.arr_parroquia=this.c_arr_parroquia;
			}
		});
		this._adminService.listar_zona(this.token).subscribe((response)=>{
			if(response.data!=undefined){
				this.c_arr_zona=response.data;
				this.arr_zona=this.c_arr_zona;
			}
		});

		
	}
	tiponav(id){
		this.tp=id;
		switch (id){
			case 'Provincia':
				this.load_provincia=true;

				this.load_parroquia=false;
				this.load_canton=false;
				this.load_recinto=false;
				this.load_zona=false;
			break;
			case 'Canton':
				this.load_canton=true;

				this.load_provincia=false;
				this.load_parroquia=false;
				this.load_recinto=false;
				this.load_zona=false;
			break;
			case 'Parroquia':
				this.load_parroquia=true;

				this.load_provincia=false;
				this.load_canton=false;
				this.load_recinto=false;
				this.load_zona=false;
			break;
			case 'Zona':
				this.load_zona=true;

				this.load_provincia=false;
				this.load_parroquia=false;
				this.load_canton=false;
				this.load_recinto=false;
			break;
			default:
				this.load_recinto=true;

				this.load_provincia=false;
				this.load_parroquia=false;
				this.load_canton=false;
				this.load_zona=false;
				break;	
		}
	}
	estadoprovincia(registroForm: { valid: any }){
		if (registroForm.valid) {
			this._adminService.registro_provincia(this.new_provincia,this.token).subscribe((response)=>{
				if(response.message==undefined){
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "Agregado con exito"
					});
					this.llamada();
				}else{
					iziToast.show({
						title: "Warinng",
						titleColor: "red",
						color: "red",
						class: "text-warning",
						position: "topRight",
						message: response.message
					});
				}
			});
		}
	}
	estadocanton(registroForm: { valid: any }){
		if (registroForm.valid) {
			this._adminService.registro_canton(this.new_canton,this.token).subscribe((response)=>{
				if(response.message==undefined){
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "Agregado con exito"
					});
					this.llamada();
				}else{
					iziToast.show({
						title: "Warinng",
						titleColor: "red",
						color: "red",
						class: "text-warning",
						position: "topRight",
						message: response.message
					});
				}
			});
		}
	}
	estadoparroquia(registroForm: { valid: any }){
		if (registroForm.valid) {
			this._adminService.registro_parroquia(this.new_parroquia,this.token).subscribe((response)=>{
				if(response.message==undefined){
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "Agregado con exito"
					});
					this.llamada();
				}else{
					iziToast.show({
						title: "Warinng",
						titleColor: "red",
						color: "red",
						class: "text-warning",
						position: "topRight",
						message: response.message
					});
				}
			});
		}
	}
	estadozona(registroForm: { valid: any }){
		if (registroForm.valid) {
			//console.log(this.new_zona);
			this._adminService.registro_zona(this.new_zona,this.token).subscribe((response)=>{
				if(response.message==undefined){
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "Agregado con exito"
					});
					this.llamada();
				}else{
					iziToast.show({
						title: "Warinng",
						titleColor: "red",
						color: "red",
						class: "text-warning",
						position: "topRight",
						message: response.message
					});
				}
			});
		}
	}
	estadorecinto(registroForm: { valid: any }){
		if (registroForm.valid) {
			//console.log(this.new_recinto);
			this._adminService.registro_recinto(this.new_recinto,this.token).subscribe((response)=>{
				if(response.message==undefined){
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "Agregado con exito"
					});
					this.llamada();
				}else{
					iziToast.show({
						title: "Warinng",
						titleColor: "red",
						color: "red",
						class: "text-warning",
						position: "topRight",
						message: response.message
					});
				}
			});
		}
	}

	buscar_canton(provincia){
		
		if(provincia!=''){

			this.arr_canton=this.c_arr_canton;
			//console.log(this.new_parroquia.codigo_provincia);

			if(this.load_parroquia){
				this.new_parroquia.codigo_canton='';
				this.new_parroquia.codigo_provincia=provincia;
				var valor=this.new_parroquia.codigo_provincia;
			}
			if(this.load_zona){
				this.new_zona.codigo_provincia=provincia;
				this.new_zona.codigo_canton='';		
				this.new_zona.codigo_parroquia='';		
				var valor=this.new_zona.codigo_provincia;
			}
			if(this.load_recinto){
				this.new_recinto.codigo_provincia=provincia;
				this.new_recinto.codigo_canton='';
				this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				var valor=this.new_recinto.codigo_provincia;
			}


			if(valor){
				//console.log("Valor:",valor);
				this.arr_canton = this.arr_canton.filter(
					(item) =>
						valor == item.codigo_provincia
				);
				if(this.load_parroquia){
					document.getElementById('parr-canton').style.display="";
				}	
				if(this.load_zona){
					document.getElementById('zon-canton').style.display="";
				}
				if(this.load_recinto){
					document.getElementById('rec-canton').style.display="";
				}

			//console.log(this.arr_canton);
			}else{
				this.arr_canton=this.c_arr_canton;
			}
		}
		
			
	}
	buscar_parroquia(canton){
		if(canton!=''){
			
			this.arr_parroquia=this.c_arr_parroquia;
			//console.log(canton);

			if(this.load_zona){
				this.new_zona.codigo_canton=canton;
				this.new_zona.codigo_parroquia='';
				var valor=this.new_zona.codigo_canton;
			}

			if(this.load_recinto){
				this.new_recinto.codigo_canton=canton;
				this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				var valor=this.new_recinto.codigo_canton;
			}

			if(valor){
				////console.log("Valor:",valor);
				this.arr_parroquia = this.arr_parroquia.filter(
					(item) =>
						valor == item.codigo_canton
				);

			if(this.load_zona){
				document.getElementById('zon-parr').style.display="";
			}
			if(this.load_recinto){
				document.getElementById('rec-parr').style.display="";
			}

			}else{
				this.arr_parroquia=this.c_arr_parroquia;
			}
		}
	}

	buscar_zona(parroquia){
		if(parroquia!=''){
			
			this.arr_zona=this.c_arr_zona;
			//console.log(parroquia);
			if(this.load_recinto){

				this.new_recinto.codigo_parroquia=parroquia;
				this.new_recinto.codigo_zona='';
				var valor=this.new_recinto.codigo_parroquia;
			}
			

			if(valor){
				//console.log("Valor:",valor);
				this.arr_zona = this.arr_zona.filter(
					(item) =>
						valor == item.codigo_parroquia
				);
					//console.log(this.arr_zona);
			if(this.load_recinto){
				document.getElementById('rec-zona').style.display="";
			}
			
			}else{
				this.arr_zona=this.c_arr_zona;
			}
		}
	}


	descuento_valor() {
		if (
			this.distributivon.desc_beca != undefined &&
			this.distributivon.desc_beca > 0 &&
			this.distributivon.desc_beca <= 100
		) {
			this.distributivon.val_beca =
				this.valores_votaciones -
				parseFloat(
					((this.valores_votaciones * this.distributivon.desc_beca) / 100).toFixed(2)
				);
			// this.distributivon.ext2 = 'Valor';
		} else {
			iziToast.show({
				title: "Warinng",
				titleColor: "red",
				color: "red",
				class: "text-warning",
				position: "topRight",
				message: "Descuento Invalido"
			});
			this.distributivon.desc_beca = "";
			this.distributivon.val_beca = "";
		}
	}
	valor_descuento() {
		if (
			this.distributivon.val_beca != undefined &&
			this.distributivon.val_beca <= this.valores_votaciones &&
			this.distributivon.val_beca >= 0
		) {
			this.distributivon.desc_beca = (
				(this.distributivon.val_beca * 100) /
				this.valores_votaciones
			).toFixed(2);
		} else {
			iziToast.show({
				title: "Warinng",
				titleColor: "red",
				color: "red",
				class: "text-warning",
				position: "topRight",
				message: "Valor Invalido"
			});
			this.distributivon.val_beca = "";
			this.distributivon.desc_beca = "";
		}
	}

	registro(registroForm: { valid: any }) {
		if (registroForm.valid) {
			//////console.log(this.distributivon);
			this.load_btn = true;

			if (
				this.distributivon.condicion_beca == "Si" &&
				this.distributivon.desc_beca != undefined &&
				this.distributivon.val_beca != undefined &&
				this.distributivon.num_mes_beca != undefined &&
				(this.distributivon.matricula == 1 || this.distributivon.matricula == 0)
			) {
				this.distributivon.paga_mat=this.distributivon.matricula;
				this._adminService.registro_distributivon(this.distributivon, this.token).subscribe(
					(response) => {
						//////console.log(response);
						if (response.message == "Distributivon agregado con exito") {
							iziToast.show({
								title: "SUCCESS",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "text-success",
								position: "topRight",
								message: response.message
							});
							this.distributivon = {
								genero: "",
								nombres: "",
								apellidos: "",
								f_nacimiento: "",
								telefono: "",
								dni: "",
								email: ""
							};
							this._router.navigate(["/distributivons"]);
						} else {
							iziToast.show({
								title: "DANGER",
								titleColor: "red",
								color: "red",
								class: "text-danger",
								position: "topRight",
								message: response.message
							});
						}

						this.load_btn = false;
					},
					(error) => {
						//////console.log(error);
					}
				);
			} else {
				if (this.distributivon.condicion_beca == "No") {
					this.distributivon.desc_beca = undefined;
					this.distributivon.val_beca = undefined;
					this.distributivon.num_mes_beca = undefined;
					this.distributivon.matricula = undefined;
					this._adminService.registro_distributivon(this.distributivon, this.token).subscribe(
						(response) => {
							//////console.log(response);
							if (
								response.message != "Algo salió mal" ||
								response.message != "El numero de cédula ya existe en la base de datos"
							) {
								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "text-success",
									position: "topRight",
									message: response.message
								});
								this.distributivon = {
									genero: "",
									nombres: "",
									apellidos: "",
									f_nacimiento: "",
									telefono: "",
									dni: "",
									email: ""
								};
								this._router.navigate(["/distributivons"]);
							} else {
								iziToast.show({
									title: "DANGER",
									titleColor: "red",
									color: "red",
									class: "text-danger",
									position: "topRight",
									message: response.message
								});
							}

							this.load_btn = false;
						},
						(error) => {
							//////console.log(error);
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
