import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";

import { DistributivonService } from "src/app/service/distributivon.service";
import { GLOBAL } from "src/app/service/GLOBAL";
import { TableUtil } from "./tableUtil";
import { TableUtil2 } from "./tableUtil";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-show-votaciones",
	templateUrl: "./show-votaciones.component.html",
	styleUrls: ["./show-votaciones.component.css"]
})
export class ShowVotacionesComponent implements OnInit {
	public pago: any = {};
	public id = "";
	public token = localStorage.getItem("token");
	public load = false;

	public url = GLOBAL.url;
	public detalles: Array<any> = [];
	public load_data = true;

	public totalstar = 5;

	public review: any = {};
	public load_send = false;
	public load_conf_pago = false;
	public load_final = false;
	public load_del = false;
	public tracking = "";
	public mes: any;
	public auxmes: any;
	public auxmes1: any;
	public auxmes2: any;
	public auxmes3: any;
	public auxmes4: any;
	public auxmes5: any;
	public auxmes6: any;
	public auxmes7: any;
	public auxmes8: any;
	public auxmes9: any;
	public auxmes10: any;
	public idpension: any;
	private mesespdf = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
	
	public fecha: Array<any> = [];
	public pension: any = {};

	constructor(
		private _route: ActivatedRoute,
		private _adminService: AdminService,

		private _distributivonService: DistributivonService,
		private _router: Router
	) {
		this.token = localStorage.getItem("token");
		this.url = GLOBAL.url;
	}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this.id = params["id"];

			this.init_data();
		});
	}

	init_data() {
		this._adminService
			.obtener_detalles_ordenes_distributivon(this.id, this.token)
			.subscribe((response) => {
				////console.log(response);
				if (response.data != undefined) {
					this.pago = response.data;
					this.detalles = response.detalles;
					this.load_data = false;
					this.detalle_data();
				} else {
					this.pago = undefined;
					this.load_data = false;
				}

				////console.log(this.detalles);
			});
	}
	exportTable(){
		TableUtil.exportToPdf( this.mesespdf[new Date(this.auxmes).getMonth()].toString()+ ' '+ new Date(this.auxmes).getFullYear().toString()+'-'+(new Date(this.auxmes).getFullYear()+1).toString());
	}
	exportTable2(){
		TableUtil2.exportToPdf( this.mesespdf[new Date(this.auxmes).getMonth()].toString()+ ' '+ new Date(this.auxmes).getFullYear().toString()+'-'+(new Date(this.auxmes).getFullYear()+1).toString());
	}
	detalle_data() {
		this._distributivonService
			.obtener_pension_distributivon_guest(this.pago.distributivon._id, this.token)
			.subscribe((response) => {
				this.pension = response.data;
				for (var i = 0; i <= this.pension.length; i++) {
					////console.log(this.pension[i].meses);
					////console.log(i);

					if (this.pension[i]._id == this.detalles[0].idpension) {
						this.idpension = this.pension[i]._id;

						this.auxmes = this.pension[i].anio_lectivo;
						let j = 0;

						for (j = 0; j < 10; j++) {
							//if(j>=this.pension[i].meses){
							this.fecha.push({
								date: new Date(this.pension[i].anio_lectivo).setMonth(
									new Date(this.pension[i].anio_lectivo).getMonth() + j
								)
							});

							//}
						}
						////console.log(this.fecha);

						i = this.pension.length;
					}
				}
			});
	}

	finalzar(id: any) {}

	enviar(id: any) {}

	eliminar(id: any) {}

	confirmar_pago(id: any) {}
}
