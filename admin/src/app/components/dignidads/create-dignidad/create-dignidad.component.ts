import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-create-dignidad",
	templateUrl: "./create-dignidad.component.html",
	styleUrls: ["./create-dignidad.component.css"]
})
export class CreateDignidadComponent implements OnInit {
	public dignidad: any = {};
	public imgSelect: any;
	public categorias: Array<any> = [];
	public config: any = {};
	public load_btn = false;
	public file: any = undefined;

	public arr_etiquetas: Array<any> = [];
	public token = localStorage.getItem("token");
	public new_etiqueta = "";
	public load_data_etiqueta = false;
	public etiquetas: Array<any> = [];
	public rol: any;
	public aux: any;
	public provincia: Array<any>=[];
	constructor(private _adminService: AdminService, private _router: Router) {
		this.config = {
			height: 500
		};
	}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			if(response.data){
				this.rol = response.data.rol;
				this.aux = response.data.email;
				////console.log(this.rol);
				this._adminService.listar_provincia(this.token).subscribe((response)=>{
					this.provincia=[];
					this.provincia=response.data;
					//console.log(response.data);
				});
			}	
		});
		
	}

	registro(registroForm: any) {
		if (registroForm.valid) {
			this.load_btn = true;

			this._adminService.registro_dignidad(this.dignidad, this.token).subscribe(
				(response) => {
					if (response.message != undefined) {
						iziToast.show({
							title: "ERROR",
							titleColor: "#FF0000",
							color: "#FFF",
							class: "text-danger",
							position: "topRight",
							message: response.message
						});
						this.load_btn = false;
					} else {
						iziToast.show({
							title: "SUCCESS",
							titleColor: "#1DC74C",
							color: "#FFF",
							class: "text-success",
							position: "topRight",
							message: "Se registro correctamente la nueva dignidad."
						});
						this.load_btn = false;

						this._router.navigate(["/dignidads"]);
					}
				},
				(error) => {
					this.load_btn = false;
				}
			);

			this.load_btn = false;
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
	/*
  registro(registroForm:any){
    if(registroForm.valid){
      
        this.load_btn = true;
        
        this._adminService.registro_dignidad_admin(this.dignidad,this.file,this.token).subscribe(
          response=>{
  
            if(response.data == undefined){
              iziToast.show({
                  title: 'ERROR',
                  titleColor: '#FF0000',
                  color: '#FFF',
                  class: 'text-danger',
                  position: 'topRight',
                  message: response.message
              });
              this.load_btn = false;
            }else{
              iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#1DC74C',
                  color: '#FFF',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'Se registro correctamente el nuevo dignidad.'
              });
              this.load_btn = false;

              this._router.navigate(['/dignidads']);
            }
          },
          error=>{
            this.load_btn = false;
          }
        );

        this.load_btn = false;
      
      
    }else{

      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos'
      });
      this.load_btn = false;

      
    }
  }
*/
}
