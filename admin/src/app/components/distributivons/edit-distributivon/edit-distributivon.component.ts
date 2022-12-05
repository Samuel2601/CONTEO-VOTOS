import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { DistributivonService } from "src/app/service/distributivon.service";
import { GLOBAL } from "src/app/service/GLOBAL";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-edit-distributivon",
	templateUrl: "./edit-distributivon.component.html",
	styleUrls: ["./edit-distributivon.component.css"]
})
export class EditDistributivonComponent implements OnInit {
	public distributivon: any = {};
	public id: any;
	public config: any = {};
	public valores_votaciones = 0;
	public load_btn = false;
	public load_data = true;
	public token = localStorage.getItem("token");
	public url = GLOBAL.url;
	public pmat = false;
	public mbeca = 0;
	public rol: any;
	public yo = 0;
	public pension: any = {};
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
		
					this._distributivonService.obtener_distributivon_guest(this.id, this.token).subscribe(
						(response) => {
							//console.log(response);
							if (response.data == undefined) {
								this.distributivon = undefined;
								this.load_data = false;
							} else {
								this.distributivon = response.data;
		
							}
						},
						(error) => {}
					);
					
		
					
				});
			}
			
			////console.log(this.yo);
		});

		
	}

	descuento_valor() {
		this.distributivon.desc_beca = this.pension.desc_beca;
		if (
			this.distributivon.desc_beca != undefined &&
			this.distributivon.desc_beca > 0 &&
			this.distributivon.desc_beca <= 100
		) {
			this.distributivon.val_beca = (
				this.valores_votaciones -
				parseFloat(
					((this.valores_votaciones * this.distributivon.desc_beca) / 100).toFixed(2)
				)
			).toFixed(2);
			this.pension.val_beca = this.distributivon.val_beca;
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
		this.distributivon.val_beca = this.pension.val_beca;
		if (
			this.distributivon.val_beca != undefined &&
			this.distributivon.val_beca <= this.valores_votaciones &&
			this.distributivon.val_beca >= 0
		) {
			this.distributivon.desc_beca = (
				(this.distributivon.val_beca * 100) /
				this.valores_votaciones
			).toFixed(2);
			this.pension.desc_beca = this.distributivon.desc_beca;
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
	actualizar(updateForm: { valid: any }) {
		if (updateForm.valid) {
			this.load_btn = true;
			if (this.distributivon.condicion_beca == "Si") {
				if (this.distributivon.matricula == undefined) {
					this.distributivon.matricula = this.pension.matricula;
					this.distributivon.paga_mat=this.distributivon.matricula;
				}
				if (this.distributivon.num_mes_beca == undefined) {
					this.distributivon.num_mes_beca = this.pension.num_mes_beca;
				}
				if (this.distributivon.desc_beca == undefined) {
					this.distributivon.desc_beca = this.pension.desc_beca;
				}
				if (this.distributivon.val_beca == undefined) {
					this.distributivon.val_beca = this.pension.val_beca;
				}
			}

			this._distributivonService
				.actualizar_distributivon_admin(this.id, this.distributivon, this.token)
				.subscribe(
					(response) => {
						if (response.message == "Actualizado con exito") {
							iziToast.show({
								title: "SUCCESS",
								titleColor: "#1DC74C",
								color: "#FFF",
								class: "text-success",
								position: "topRight",
								message: response.message
							});

							this.load_btn = false;

							this._router.navigate(["/distributivons"]);
						} else {
							iziToast.show({
								title: "DANGER",
								titleColor: "red",
								color: "red",
								class: "text-warning",
								position: "topRight",
								message: response.message
							});
							this.distributivon.num_mes_beca = "";
							this.ngOnInit();
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
			this.ngOnInit();
		}
	}
}
