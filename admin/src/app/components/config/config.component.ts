import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";
declare var iziToast: any;
declare var $: any;
@Component({
	selector: "app-config",
	templateUrl: "./config.component.html",
	styleUrls: ["./config.component.css"]
})
export class ConfigComponent implements OnInit {
	public config: any = {};
	public load_btn = true;
	public token = localStorage.getItem("token");
	public load_data = true;
	public rol=undefined;
	public auxdate='';
	public yo=0;
	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			this.rol = response.data.rol;
			if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
				this.yo = 1;
			}
			//console.log(this.yo);
		});
		this.init_data();
	}

	init_data() {
		this.load_data = true;
		/*this._adminService.obtener_config_admin().subscribe((response) => {
			this.config = response.data;
			this.auxdate=this.config.anio_lectivo;
			this.load_data = false;
			this._adminService.actualizar_config_admin(this.config,this.token).subscribe(
          response=>{
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#FFF',
                class: 'text-success',
                position: 'topRight',
                message: 'Se encuentra actualiza correctamente las configuraciones.'
            });
          },
          error=>{
            this.load_btn = false;
          }
        );
			if (this.config.numpension >= 10) {
				this.load_btn = false;
			}
		});*/
	}
	actualizar(actualizarForm: any) {
		//console.log(actualizarForm);

		if (actualizarForm.valid) {
			this.load_btn = true;
			//console.log(this.config);

			this._adminService.actualizar_config_admin(this.config, this.token).subscribe(
				(response) => {
					if (response.message == undefined) {
						iziToast.show({
							title: "SUCCESS",
							titleColor: "#1DC74C",
							color: "#FFF",
							class: "text-success",
							position: "topRight",
							message: "Se actualizó correctamente las configuraciones."
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

					this.load_btn = false;

					this.ngOnInit();
					$("#modalConfirmar").modal("hide");
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
		}
	}
}
