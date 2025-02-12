import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { DistributivonService } from "src/app/service/distributivon.service";
import { GLOBAL } from "src/app/service/GLOBAL";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-edit-administrativoadministrativo",
	templateUrl: "./edit-administrativo.component.html",
	styleUrls: ["./edit-administrativo.component.css"]
})
export class EditAdminComponent implements OnInit {
	public distributivon: any = {};
	public auxadmin: any = {};
	public id: any;
	public config: any = {};
	public valores_votaciones = 0;
	public load_btn = false;
	public load_data = true;
	public token = localStorage.getItem("token");
	public url = GLOBAL.url;
	public rol: any;
	public yo = 0;
	public pension: any = {};
	public idp: any;
	constructor(
		private _route: ActivatedRoute,

		private _adminService: AdminService,
		private _distributivonService: DistributivonService,
		private _router: Router
	) {}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				this.idp = response.data._id;
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
		
				this._route.params.subscribe((params) => {
					this.id = params["id"];
		
					this._adminService.obtener_admin(this.id, this.token).subscribe(
						(response) => {
							// ////console.log(response);
							if (response.data == undefined) {
								this.distributivon = undefined;
								this.load_data = false;
							} else {
								this.distributivon = response.data;
								this.auxadmin = this.distributivon;
								//  ////console.log(this.auxadmin);
								this.auxadmin.password = "";
		
								this.load_data = false;
								this.distributivon.password = "";
								this.distributivon.auxiliar = "";
								//   ////console.log(this.distributivon);
							}
						},
						(error) => {}
					);
				});
			}
			

		});
		
	}

	actualizar(updateForm: { valid: any }) {
		// ////console.log(this.distributivon.password);
		if (
			this.distributivon.password != this.distributivon.auxiliar ||
			(this.distributivon.password != "" && this.distributivon.password.length < 8)
		) {
			iziToast.show({
				title: "ERROR",
				class: "text-DANGER",
				titleColor: "red",
				color: "red",
				position: "topRight",
				message: "Contraseña, minimo 8 caracteres"
			});
			this.distributivon.password = "";
			this.distributivon.auxiliar = "";
		} else {
			if (updateForm.valid) {
				this.load_btn = true;
				this._adminService
					.actualizar_admin(this.id, this.distributivon, this.token)
					.subscribe((response) => {
						if (response.message == "Actualizado con exito") {
							iziToast.show({
								title: "SUCCESS",
								class: "text-success",
								titleColor: "green",
								color: "green",
								position: "topRight",
								message: response.message
							});
							this.load_btn = false;
							this._router.navigate(["/distributivons"]);
						} else {
							iziToast.show({
								title: "DANGER",
								class: "text-DANGER",
								titleColor: "red",
								color: "red",
								position: "topRight",
								message: response.message
							});
							this.load_btn = false;
							this.ngOnInit();
						}
					});
			}
		}
	}
}
