import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { DistributivonService } from "src/app/service/distributivon.service";
declare var iziToast: any;

@Component({
	selector: "app-create-administrativo",
	templateUrl: "./create-administrativo.component.html",
	styleUrls: ["./create-administrativo.component.css"]
})
export class CreateAdminComponent implements OnInit {
	public distributivon: any = {};
	public rol: any;
	public token;
	public load_btn = false;
	public load_beca: any;
	public valores_votaciones = 0;

	constructor(
		private _distributivonService: DistributivonService,
		private _adminService: AdminService,
		private _router: Router
	) {
		this.token = localStorage.getItem("token");
	}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
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
			}
			
		});

		
	}

	registro(registroForm: { valid: any }) {
		if (this.distributivon.password != this.distributivon.auxiliar) {
			iziToast.show({
				title: "DANGER",
				class: "text-danger",
				titleColor: "red",
				color: "red",
				position: "topRight",
				message: "Las contraseñas no coinciden"
			});
		} else {
			if (registroForm.valid) {
				////console.log(this.distributivon);
				this.load_btn = true;
				this.distributivon.email=this.distributivon.dni;
				this.distributivon.geo = localStorage.getItem("geo");
				this._adminService.registro_admin(this.distributivon, this.token).subscribe(
					(response) => {
						////console.log(response);
						if (response.message == "Registrado con exito") {
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
								password: "",
								auxiliar: "",
								telefono: "",
								dni: "",
								email: ""
							};

							this.load_btn = false;

							this._router.navigate(["/administrativo"]);
						} else {
							iziToast.show({
								title: "DANGER",
								titleColor: "RED",
								color: "RED",
								class: "text-dannger",
								position: "topRight",
								message: response.message
							});
							this.load_btn = false;
						}
					},
					(error) => {
						////console.log(error);
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


}
