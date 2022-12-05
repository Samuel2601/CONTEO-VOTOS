import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { GLOBAL } from "src/app/service/GLOBAL";

import { DistributivonService } from "src/app/service/distributivon.service";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-detalle-distributivon",
	templateUrl: "./detalle-distributivon.component.html",
	styleUrls: ["./detalle-distributivon.component.css"]
})
export class DetalleDistributivonComponent implements OnInit {
	public distributivon: any = {};
	public id: string = "";
	public pago: any = {};
	public total_pagar = 0;
	public fecha: Array<any> = [];
	public pagopension: Array<any> = [];
	public detalles: any = {};
	public auxbecares = 0;
	public votacionesdistributivon: any = {};
	public idexpension = 0;

	public config: any = {};

	public load_del = true;
	public pension: any = {};
	public idpension = -1;
	public auxmes = 0;
	public condicion = "No";
	public review: any = {};
	public load_send = false;
	public load_conf_pago = false;
	public load_final = false;
	public tracking = "";
	public diciembre: any;
	public load_btn = false;
	public load_data = true;
	public token = localStorage.getItem("token");
	public url = GLOBAL.url;
	public p: any = [];
	constructor(
		private _route: ActivatedRoute,

		private _distributivonService: DistributivonService,
		private _adminService: AdminService,
		private _router: Router
	) {}

	ngOnInit(): void {
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
					////console.log(response);
					if (response.data == undefined) {
						this.distributivon = undefined;
						this.load_data = false;
					} else {
						this.distributivon = response.data;
						// //console.log(this.distributivon);
						this.load_data = false;

						this.init_data();
					}
				},
				(error) => {}
			);
		});
	}
	init_data() {
		/*this._adminService.obtener_config_admin().subscribe((response) => {
			////console.log(response);
			this.config = response.data;
			////console.log(this.config);
			this._distributivonService.obtener_pension_distributivon_guest(this.id, this.token).subscribe((response) => {
				this.votacionesdistributivon = response.data;
				//console.log(this.votacionesdistributivon);
				this.detalle_data(this.votacionesdistributivon.length - 1);
			});
		});
*/
		
	}

	detalle_data(val: any) {
		this.total_pagar = 1;
		this.idexpension = val;
		////console.log(this.idexpension);
		////console.log(this.distributivon._id);
		// //console.log(this.votacionesdistributivon[this.idexpension].anio_lectivo);
		var auxmeses;
		////console.log('fecha', this.distributivon.f_desac,'Estado',this.distributivon.estado);
		if (this.distributivon.f_desac != undefined && this.distributivon.estado == "Desactivado") {
			let mes =
				(new Date(this.distributivon.f_desac).getFullYear() -
					new Date(
						this.votacionesdistributivon[this.idexpension].anio_lectivo
					).getFullYear()) *
				12;
			mes -= new Date(this.votacionesdistributivon[this.idexpension].anio_lectivo).getMonth();
			mes += new Date(this.distributivon.f_desac).getMonth();
			if (mes > 10) {
				auxmeses = 10;
			} else {
				auxmeses = mes + 1;
			}
		} else {
			auxmeses = 10;
		}

		////console.log(auxmeses);
		this._adminService
			.obtener_detalles_por_distributivon(this.id, this.token)
			.subscribe((response) => {
				////console.log(response);
				if (response.data != undefined) {
					this.pago = response.data;

					this.detalles = response.detalles;
					////console.log(this.detalles);
					this.armado(auxmeses);
					//this.load_data = false;
				} //else{
				// this.pago = undefined;
				// this.load_data = false;
				// }
			});
	}
	armado(tiempo: any) {
		this.auxbecares = 0;
		this.total_pagar = 0;
		//console.log(this.detalles);
		var f = this.votacionesdistributivon[this.idexpension].anio_lectivo;
		if (this.votacionesdistributivon[this.idexpension].num_mes_beca != undefined) {
			this.auxbecares = this.votacionesdistributivon[this.idexpension].num_mes_beca;
		}
		////console.log(this.auxbecares);
		this.condicion = this.votacionesdistributivon[this.idexpension].condicion_beca;
		if (this.detalles != undefined) {
			this.pagopension = [];
			let est;
			let valor;
			let idpago: any = [];
			let tipo;
			for (var j = 0; j <= tiempo; j++) {
				est = "Sin Pago";
				valor = 0;
				idpago = undefined;
				tipo = "no";
				idpago = [];
				for (let k = 0; k < this.detalles.length; k++) {
					if (
						j == this.detalles[k].tipo &&
						this.detalles[k].idpension == this.votacionesdistributivon[this.idexpension]._id
					) {
						est = this.detalles[k].estado;
						valor += this.detalles[k].valor;
						idpago.push(this.detalles[k].pago);
						tipo = this.detalles[k].tipo;
					}
				}
				if(new Date(this.detalles[j])){

				}

				if (j == 0) {
					if (
						(this.votacionesdistributivon[this.idexpension].matricula == 1 && valor != 0) ||
						this.votacionesdistributivon[this.idexpension].matricula == 0
					) {
						this.total_pagar = this.total_pagar + this.config.matricula;
					}
					//  //console.log('Matricula',this.config.matricula);
				} else {
					//  //console.log('Mes',new Date(new Date(f).setMonth(new Date(f).getMonth()+j-1)).getMonth());
					if (
						new Date(new Date(f).setMonth(new Date(f).getMonth() + j - 1)).getMonth() ==
							11 &&
						j != 0
					) {
						// //console.log('Pension',this.config.pension);
						this.diciembre = new Date(f).setMonth(new Date(f).getMonth() + j - 1);
						this.total_pagar = this.total_pagar + this.config.pension;
					} else {
						if (this.auxbecares != undefined && j > 0 && j <= this.auxbecares) {
							//  //console.log('Beca',this.votacionesdistributivon[this.idexpension].val_beca);
							this.total_pagar =
								this.total_pagar + this.votacionesdistributivon[this.idexpension].val_beca;
						} else {
							if (j != 0) {
								//  //console.log('Pension',this.config.pension);
								this.total_pagar = this.total_pagar + this.config.pension;
							}
						}
					}
				}
				this.total_pagar = this.total_pagar - valor;
				// //console.log(this.total_pagar);

				this.p.push({ pago: idpago, tp: tipo });
				if (j == 0) {
					this.pagopension.push({
						date: "Matricula",
						estado: est,
						valor: valor,
						pago: idpago,
						tipo: tipo
					});
				} else {
					this.pagopension.push({
						date: new Date(f).setMonth(new Date(f).getMonth() + j - 1),
						estado: est,
						valor: valor,
						pago: idpago,
						tipo: tipo
					});
				}
				//this.pension[this.pension.length-1].pago.push(idpago);
			}

			// //console.log(this.pagopension);
		}

		////console.log(this.pagopension);
	}

	finalzar(id: any) {
		this.load_final = true;
		this._adminService
			.marcar_finalizado_orden(id, { data: "" }, this.token)
			.subscribe((response) => {
				iziToast.show({
					title: "SUCCESS",
					titleColor: "#1DC74C",
					color: "#FFF",
					class: "text-success",
					position: "topRight",
					message: "El pago fue cerrada correctamente."
				});
				$("#openConfirmarPago").modal("hide");
				$(".modal-backdrop").remove();
				this.load_final = false;
				this.init_data();
			});
	}

	enviar(id: any) {
		if (this.tracking) {
			this.load_send = true;
			this._adminService
				.marcar_envio_orden(id, { tracking: this.tracking }, this.token)
				.subscribe((response) => {
					iziToast.show({
						title: "SUCCESS",
						titleColor: "#1DC74C",
						color: "#FFF",
						class: "text-success",
						position: "topRight",
						message: "La orden fue marcada como enviada."
					});
					$("#openEnviado").modal("hide");
					$(".modal-backdrop").remove();
					this.load_send = false;
					this.init_data();
				});
		} else {
			iziToast.show({
				title: "DANGER",
				titleColor: "#FF0000",
				color: "#FFF",
				class: "text-success",
				position: "topRight",
				message: "Ingrese el numero de seguimiento."
			});
		}
	}

	eliminar(id: any) {
		this.load_del = true;
		this._adminService.eliminar_orden_admin(id, this.token).subscribe((response) => {
			iziToast.show({
				title: "SUCCESS",
				titleColor: "#1DC74C",
				color: "#FFF",
				class: "text-success",
				position: "topRight",
				message: "El pedido fue eliminada correctamente."
			});
			$("#openEliminar").modal("hide");
			$(".modal-backdrop").remove();
			this._router.navigate(["/votaciones"]);
			this.load_del = false;
		});
	}

	confirmar_pago(id: any) {
		this.load_conf_pago = true;
		this._adminService
			.confirmar_pago_orden(id, { data: "" }, this.token)
			.subscribe((response) => {
				iziToast.show({
					title: "SUCCESS",
					titleColor: "#1DC74C",
					color: "#FFF",
					class: "text-success",
					position: "topRight",
					message: "El pago fue confirmado correctamente."
				});
				$("#openConfirmarPago").modal("hide");
				$(".modal-backdrop").remove();
				this.load_conf_pago = false;
				this.init_data();
			});
	}
}
