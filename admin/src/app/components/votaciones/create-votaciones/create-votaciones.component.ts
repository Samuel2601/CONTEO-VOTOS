import { CdkAccordion } from "@angular/cdk/accordion";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { DistributivonService } from "src/app/service/distributivon.service";
import { GLOBAL } from "src/app/service/GLOBAL";

declare var $: any;
declare var iziToast: any;

@Component({
	selector: "app-create-votaciones",
	templateUrl: "./create-votaciones.component.html",
	styleUrls: ["./create-votaciones.component.css"]
})
export class CreateVotacionesComponent implements OnInit {
	public geo = localStorage.getItem('geo');
	public url = GLOBAL.url;
	public carga=true;
	public load_btn = false;
	public dignidadcreate: any = {};
	public rol: any;
	public valores_votaciones = 0;
	public aux_valor_pension = 0;
	public num_votaciones = 0;
	public num_pagado = -1;
	public meses_beca = -1;
	public valor_matricula = 0;
	public matricula_pago = -1;
	public tipo = '';
	public tok = -1;

	public config: any = {};

	public distributivons_const: Array<any> = [];
	public load_data = false;
	public token = localStorage.getItem("token");

	public filtro_distributivon = "";
	public distributivons: Array<any> = [];
	public pageDistributivon = 1;
	public pageSizeDistributivon = 20;
	public load_distributivons = false;

	public direcciones: Array<any> = [];
	public pageDireccion = 1;
	public pageSizeDireccion = 20;
	public load_direcciones = false;
	public direccion_select: any = {};

	public dignidad: Array<any> = [];
	public auxabono: Array<any> = [];
	public dignidad_const: Array<any> = [];
	public pageVariedad = 1;
	public pageSizeVariedad = 20;
	public load_dignidad = false;
	public dignidad_select: any = undefined;
	public mes: any;


	public auxvalordeposito = 0;
	public checkfecha: any;

	public valor: number = 1;

	public valorigualdignidad: number = 0;
	public indexpen = -1;

	public pago: any = {};
	public auxpago: any = {};
	public pension: any = {};

	public dpago: Array<any> = [];

	public total_pagar = 0;
	public auxtotalpago: any = 0.0;
	public envio_input = 0;
	public neto_pagar = 0;
	public filtro_dignidad = "";
	public descuento = 0;
	public yo=0;
	public btnnuevodignidad = document.getElementById("btnnuevodignidad");
	selec_est: any;
	anio_lentivo: any;

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

	public new_votacion: any = {
		codigo_canton:undefined,
		codigo_dignidad:undefined,
		codigo_parroquia:undefined,
		codigo_provincia:undefined,
		codigo_recinto:undefined,
		codigo_zona:undefined,
		junta:undefined,
		localizacion:undefined,
		tipo_junta:undefined,
		//file:undefined,
		admin:undefined
	};

	public pageProvincia = 1;
	public pageSizeProvincia = 20;
	public filtro_provincia='';

	public pageCanton = 1;
	public pageSizeCanton = 20;
	public filtro_canton='';

	public pageParroquia = 1;
	public pageSizeParroquia = 20;
	public filtro_parroquia='';

	public pageZona = 1;
	public pageSizeZona = 20;
	public filtro_zona='';

	public pageRecinto = 1;
	public pageSizeRecinto = 20;
	public filtro_recinto='';
	
	public d_p:any={};
	public tipo_jt='';
	public junta:any={};
	public histo:any={};
	recinto: any;
	public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
	public file : any = undefined;
	public conf='';
	constructor(
		private _adminService: AdminService,
		private _distributivonService: DistributivonService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.carga=true;
		
		//$(".modal-backdrop").removeClass("hide");
		if(this.geo){
			setTimeout(function(){
				$("#modal-spinner").modal("show");
			}, 1000);
			
			//var arr=[];
			//arr=JSON.parse(this.geo);
			this.new_votacion.localizacion=this.geo;
			let aux = localStorage.getItem("identity");
			this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
				this.rol = response.data.rol;
				this.config=response.data;
				if(response.data.config){
					this.conf=response.data.config;

					this.histo=JSON.parse(this.conf);

					this.llamada_pro(true);
				}else{
					this.carga=false;
					$("#modal-spinner").modal("hide");
				}
			
				this.new_votacion.admin=response.data._id;
				if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
					this.yo = 1;
				}
				//////console.log(this.yo);
			});
		}
		
		//$("#btnbuscardignidad").attr("disabled", true);
		//$("#btnAgregar").attr("disabled", true);

	}

	llamada_pro(ver){
		this.load_provincia=true;
		this._adminService.listar_provincia(this.token).subscribe((response)=>{
			if(response.data!=undefined){
				this.c_arr_provincia=response.data;
				this.arr_provincia=this.c_arr_provincia;
				this.d_p=this.arr_provincia.find((element:any)=>element.nombre_provincia=='ESMERALDAS');
				
				if(this.histo.codigo_provincia&&ver){
					var p = this.arr_provincia.find((elemet:any)=>elemet._id==this.histo.codigo_provincia);
					this.seleccion_pro(p,true);
				}

				//console.log(this.arr_provincia);
				this.load_provincia=false;
			}
		});		
	}
	seleccion_pro(item,ver){
		this.new_votacion.codigo_provincia=item._id;
		this.new_votacion.codigo_canton=undefined;
		this.new_votacion.codigo_parroquia=undefined;
		this.new_votacion.codigo_zona=undefined;
		this.new_votacion.codigo_recinto=undefined;
		//console.log(this.new_votacion);
		this.tipo_jt=undefined;
		if(ver){
			this.llamada_can(true);
		}
		//this.llamada_can();
		
		$("#select-tipo-junta").attr("disabled", true);
		$("#btnbuscardignidad").attr("disabled", true);
		$("#input-dignidad").val('');
		$("#select-tipo-dignidad").attr("disabled", true);
		$("#modalProvincia").modal("hide");
		$("#input-canton").val('');
		$("#input-parroquia").val('');
		$("#input-zona").val('');
		$("#input-recinto").val('');
		$("#input-provincia").val(item.codigo_provincia + "/" + item.nombre_provincia);
	}
	func_filtro_provincia(){
		this.arr_provincia=this.c_arr_provincia;
		if(this.filtro_provincia){
			var valor = this.filtro_provincia.toString();
			//console.log("Valor:",valor);
			this.arr_provincia = this.arr_provincia.filter(
				(item) =>
					valor == item.codigo_provincia
			);
		}else{
			this.arr_provincia=this.c_arr_provincia;
		}
	}
	llamada_can(ver){
		this.load_canton=true;
		if(this.new_votacion.codigo_provincia){
			this._adminService.listar_canton(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_canton=response.data;
					//console.log(response.data);
					this.c_arr_canton=this.c_arr_canton.filter((element:any)=>
						this.new_votacion.codigo_provincia==element.codigo_provincia
					);
					
					this.arr_canton=this.c_arr_canton;
					if(ver&&this.histo.codigo_canton&&this.new_votacion.codigo_provincia==this.histo.codigo_provincia){
						var p = this.arr_canton.find((elemet:any)=>elemet._id==this.histo.codigo_canton);
						this.seleccion_can(p,true);
					}
					
					this.load_canton=false;
				}
			});
		}
				
	}
	seleccion_can(item,ver){
		this.new_votacion.codigo_canton=item._id;
		this.new_votacion.codigo_parroquia=undefined;
		this.new_votacion.codigo_zona=undefined;
		this.new_votacion.codigo_recinto=undefined;
		this.tipo_jt=undefined;
		if(ver){
			this.llamada_parr(true);
		}
		//console.log(this.new_votacion);
		$("#select-tipo-junta").attr("disabled", true);
		$("#input-dignidad").val('');
		$("#btnbuscardignidad").attr("disabled", true);
		$("#select-tipo-dignidad").attr("disabled", true);
		$("#modalCanton").modal("hide");
		$("#input-parroquia").val('');
		$("#input-zona").val('');
		$("#input-recinto").val('');
		$("#input-canton").val(item.codigo_canton + "/" + item.nombre_canton);
	}
	func_filtro_canton(){
		this.arr_canton=this.c_arr_canton;
		if(this.filtro_canton){
			var valor = this.filtro_canton.toString();
			//console.log("Valor:",valor);
			this.arr_canton = this.arr_canton.filter(
				(item) =>
					valor == item.codigo_canton
			);
		}else{
			this.arr_canton=this.c_arr_canton;
		}
	}
	llamada_parr(ver){
		this.load_parroquia=true;
		if(this.new_votacion.codigo_canton){
			this._adminService.listar_parroquia(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_parroquia=response.data;
					this.c_arr_parroquia=this.c_arr_parroquia.filter((element:any)=>
						this.new_votacion.codigo_canton==element.codigo_canton
					);
					this.arr_parroquia=this.c_arr_parroquia;
					if(ver&&this.histo.codigo_parroquia&&this.new_votacion.codigo_canton==this.histo.codigo_canton){
						var p = this.arr_parroquia.find((elemet:any)=>elemet._id==this.histo.codigo_parroquia);
						this.seleccion_parr(p,true);
					}
					this.load_parroquia=false;
				}
			});	
		}
			
	}
	seleccion_parr(item,ver){
		this.new_votacion.codigo_parroquia=item._id;
		this.new_votacion.codigo_zona=undefined;
		this.new_votacion.codigo_recinto=undefined;
		//console.log(this.new_votacion);
		this.tipo_jt=undefined;
		if(ver){
			this.llamada_zon(true);
		}
		$("#select-tipo-junta").attr("disabled", true);
		$("#input-dignidad").val('');
		$("#btnbuscardignidad").attr("disabled", true);
		$("#select-tipo-dignidad").attr("disabled", true);
		$("#modalParroquia").modal("hide");
		$("#input-zona").val('');
		$("#input-recinto").val('');
		$("#input-parroquia").val(item.codigo_parroquia + "/" + item.nombre_parroquia);
	}
	func_filtro_parroquia(){
		this.arr_parroquia=this.c_arr_parroquia;
		if(this.filtro_parroquia){
			var valor = this.filtro_parroquia.toString();
			//console.log("Valor:",valor);
			this.arr_parroquia = this.arr_parroquia.filter(
				(item) =>
					valor == item.codigo_parroquia
			);
		}else{
			this.arr_parroquia=this.c_arr_parroquia;
		}
	}

	llamada_zon(ver){
		this.load_zona=true;
		if(this.new_votacion.codigo_parroquia){
			this._adminService.listar_zona(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_zona=response.data;
					this.c_arr_zona=this.c_arr_zona.filter((element:any)=>
						this.new_votacion.codigo_parroquia==element.codigo_parroquia
					);
					this.arr_zona=this.c_arr_zona;

					if(ver&&this.histo.codigo_zona&&this.new_votacion.codigo_parroquia==this.histo.codigo_parroquia){
						var p = this.arr_zona.find((elemet:any)=>elemet._id==this.histo.codigo_zona);
						this.seleccion_zon(p,true);
					}

					this.load_zona=false;
				}
			});
		}
	}
	seleccion_zon(item,ver){
		this.new_votacion.codigo_zona=item._id;
		this.new_votacion.codigo_recinto=undefined;
		//console.log(this.new_votacion);
		this.tipo_jt=undefined;
		if(ver){
			this.llamada_rec(true);
		}
		$("#select-tipo-junta").attr("disabled", true);
		$("#input-dignidad").val('');
		$("#btnbuscardignidad").attr("disabled", true);
		$("#select-tipo-dignidad").attr("disabled", true);
		$("#modalZona").modal("hide");
		$("#input-recinto").val('');
		$("#input-zona").val(item.codigo_zona + "/" + item.nombre_zona);
			
	}
	func_filtro_zona(){
		this.arr_zona=this.c_arr_zona;
		if(this.filtro_zona){
			var valor = this.filtro_zona.toString();
			//console.log("Valor:",valor);
			this.arr_zona = this.arr_zona.filter(
				(item) =>
					valor == item.codigo_zona
			);
		}else{
			this.arr_zona=this.c_arr_zona;
		}
	}
	llamada_rec(ver){
		this.load_recinto=true;
		if(this.new_votacion.codigo_zona){
			this._adminService.listar_recinto(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_recinto=response.data;
					this.c_arr_recinto=this.c_arr_recinto.filter((element:any)=>
						this.new_votacion.codigo_zona==element.codigo_zona
					);
					this.arr_recinto=this.c_arr_recinto;
					if(ver&&this.histo.codigo_recinto&&this.new_votacion.codigo_zona==this.histo.codigo_zona){
						var p = this.arr_recinto.find((elemet:any)=>elemet._id==this.histo.codigo_recinto);
						this.seleccion_rec(p,true);
					}
					this.load_recinto=false;
				}
			});
		}
	}
	seleccion_rec(item,ver){
		if(item){
			//console.log(item);
			this.new_votacion.tipo_junta='';
			this.new_votacion.codigo_recinto=item._id;
			this.recinto=item;
			//console.log(this.recinto);
			this.tipo_jt=undefined;
			if(ver==false){
			$("#modalRecinto").modal("hide");
			}else{
				$("#modal-spinner").modal("hide");
				this.carga=false;
			}
			$("#select-tipo-junta").attr("disabled", false);
			$("#input-recinto").val(item.codigo_recinto + "/" + item.nombre_recinto);
		}
		
	}
	func_filtro_recinto(){
		this.arr_recinto=this.c_arr_recinto;
		if(this.filtro_recinto){
			var valor = this.filtro_recinto.toString();
			//console.log("Valor:",valor);
			this.arr_recinto = this.arr_recinto.filter(
				(item) =>
					valor == item.codigo_recinto
			);
		}else{
			this.arr_recinto=this.c_arr_recinto;
		}
	}

	tipo_junta(tj){
		this.new_votacion.tipo_junta='';
		
		$("#select-tipo-dignidad").attr("disabled", true);
		$("#input-dignidad").val('');
		$("#btnbuscardignidad").attr("disabled", true);
		$("#select-junta-f").val('');
		$("#select-junta-m").val('');
		if(tj){
			this.tipo_jt=tj;
			this.new_votacion.tipo_junta=this.tipo_jt;
			//console.log(this.tipo_jt);
			//console.log(this.recinto.jun_inim);
			//console.log(this.recinto.jun_finm);
			
			////console.log(this.tipo_jt=='f');
			

			if(this.tipo_jt=='F'){

		
				this.junta=[];
				for(var i=parseInt(this.recinto.jun_inif);i<=parseInt(this.recinto.jun_finf);i++){
					this.junta.push((i).toString());
				}
				
			}else{
				this.junta=[];
				for(var i=parseInt(this.recinto.jun_inim);i<=parseInt(this.recinto.jun_finm);i++){
					this.junta.push((i).toString());
				}
			}
		}
	}
	junta_f(f){
		this.new_votacion.junta=undefined;
		if(f!=0){
			this.new_votacion.junta=f;
			////console.log(this.new_votacion);
			
		$("#select-tipo-dignidad").attr("disabled", false);	
		}else{
			$("#select-tipo-dignidad").attr("disabled", true);	
			this.tipo=undefined;	
			this.new_votacion.codigo_dignidad=undefined;
		}
		this.llamdo_dignidad();
	}
	junta_m(m){
		this.new_votacion.junta=undefined;
		if(m!=0){
			this.new_votacion.junta=m;
			////console.log(this.new_votacion);
			$("#select-tipo-dignidad").attr("disabled", false);
		}else{
			$("#select-tipo-dignidad").attr("disabled", true);	
			this.tipo=undefined;	
			this.new_votacion.codigo_dignidad=undefined;
		}
		this.llamdo_dignidad();
	}

	llamdo_dignidad(){
		this.dignidad_const=[];
		this.dignidad=[];
		this._adminService.listar_dignidad(this.token).subscribe((response)=>{
			if(response.data){
				console.log(response.data);
				this.dignidad_const=response.data;
				this.dignidad_const=this.dignidad_const.filter((element:any)=>
					this.new_votacion.codigo_provincia==element.codigo_provincia._id
				);

				this.dignidad_const.forEach((element:any) => {
					this.dignidad.push({dignidad:element,contador:0});
				});
				

				console.log(this.dignidad);
				//this.dignidad=this.dignidad_const;
				////console.log(this.dignidad);
				//$("#btnbuscardignidad").attr("disabled", false);

			}else{
				////console.log('no hay');
			}
		});
	}
	tipo_dignidad(tip){
		
		$("#btnbuscardignidad").attr("disabled", true);
		$("#input-dignidad").val('');

		this.tipo=tip;


		if(this.tipo){
			//console.log("tip:",tip,this.tipo);
			/*this._adminService.listar_dignidad_esp(this.tipo,this.token).subscribe((response)=>{
				if(response.data){
					this.dignidad_const=response.data;
					this.dignidad_const=this.dignidad_const.filter((element:any)=>
						this.new_votacion.codigo_provincia==element.codigo_provincia
					);

					this.dignidad_const.forEach((element:any) => {
						this.dignidad.push({dignidad:element,contador:0});
					});
					

					console.log(this.dignidad);
					this.dignidad=this.dignidad_const;
					////console.log(this.dignidad);
					$("#btnbuscardignidad").attr("disabled", false);

				}else{
					////console.log('no hay');
				}
			});
			*/
		}

	}
	seleccion_dig(item){
		if(item){
			this.new_votacion.codigo_dignidad=item._id;
			//console.log(this.new_votacion);
			$("#modalDignidad").modal("hide");
			$("#input-dignidad").val(item.nombre_dignidad);
			
		}
	}
	public cn=[];
	tabla_dig(){
		if(this.cn.length>=0){
			this.cn=[];
			
		}
		this.dignidad.forEach((element:any) => {
			var l = '#'+element.dignidad._id;
			
			$("#"+element.dignidad._id).attr("disabled", true);
			if(element.contador>0){
				this.cn.push({codigo_dignidad:element.dignidad._id,conteo:element.contador});
			}
		});	
	}


	func_filtro_dignidad(){

	}
	registro_votacion(){
		var bol=true;
		//console.log(this.new_votacion);
		if(this.file){
			//this.new_votacion.file=this.file;
				if(this.new_votacion.codigo_canton==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Canton'
					});
					bol=false;
				} if(this.new_votacion.codigo_parroquia==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Parroquia'
					});bol=false;
				} if(this.new_votacion.codigo_provincia==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Provincia'
					});bol=false;
				} if(this.new_votacion.codigo_recinto==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Recinto'
					});bol=false;
				} if(this.new_votacion.codigo_zona==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Zona'
					});bol=false;
				} if(this.new_votacion.junta==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta la Junta'
					});bol=false;
				} if(this.new_votacion.tipo_junta==undefined){
					iziToast.show({
						title: "PELIGRO: ",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Falta Tipo de Junta'
					});bol=false;
				} if(this.new_votacion.localizacion==undefined){
					iziToast.show({
						title: "ERROR FATAL",
						class: "iziToast-danger",
						position: "topRight",
						message: 'No se te puede ubicar'
					});
					bol=false;
				}
				if(this.cn.length==0){
					iziToast.show({
						title: "ERROR FATAL",
						class: "iziToast-danger",
						position: "topRight",
						message: 'Por favor guarda tu lista'
					});
					bol=false;
				}
				if(bol==true){
					this.new_votacion.codigo_dignidad=JSON.stringify(this.cn);
					console.log(this.new_votacion.codigo_dignidad);
					console.log(this.new_votacion);
					this._adminService.registrar_votacion(this.new_votacion,this.file,this.token).subscribe(response=>{
						if(response.message){
							iziToast.show({
								title: "ERROR",
								class: "iziToast-danger",
								position: "topRight",
								message: 'Algo salio mal, recarga la página'
							});
						}else{
							
							//this._router.navigate(["/votaciones/create"]);
						}
					});
					console.log("config",this.conf);
							if(this.config.config==undefined&&this.config.config==''){

								iziToast.show({
									title: "SUCCESS",
									titleColor: "#1DC74C",
									color: "#FFF",
									class: "text-success",
									position: "topRight",
									message: "Se registro correctamente su voto."
								});
								$("#configuracion").modal("show");
								$(".modal-backdrop").removeClass("hide");

							}else {
								//this.new_votacion.pop('file');
								var cf=this.new_votacion;
								/*cf.admin='';
								cf.junta='';
								cf.tipo_junta='';
								cf.codigo_dignidad='';
								*/
								var vcf=JSON.stringify(cf);
								//console.log(this.config.config==vcf);

								//console.log("Votación: ",cf);
								//console.log("Historial", this.histo);
								if(this.config.config==vcf){
									setTimeout(function(){
										location.reload();
									}, 1000);
									iziToast.show({
										title: "SUCCESS",
										titleColor: "#1DC74C",
										color: "#FFF",
										class: "text-success",
										position: "topRight",
										message: "Se registro correctamente su voto."
									});
								}else{
									$("#configuracion").modal("show");
									$(".modal-backdrop").removeClass("hide");
								}
							}
				}
		}else{
			iziToast.show({
				title: "PELIGRO: ",
				class: "iziToast-danger",
				position: "topRight",
				message: 'Adjuntar una imagen'
			});
		}

	}
	refresh(): void { location.reload(); }

	guardar_conf(){
		var cf=this.new_votacion;
		cf.admin='';
		cf.junta='';
		cf.tipo_junta='';
		cf.codigo_dignidad='';
		//console.log(cf);
		//var ver=JSON.stringify(cf);

		this.conf=JSON.stringify(cf);
		this.config.config=this.conf;
		//console.log(this.conf);
		this.config.config=this.conf;
		//console.log(this.config);
		this._adminService.guardar_conf_admin(this.config._id,this.config,this.token).subscribe(response=>{
			if(response.message){
				iziToast.show({
					title: "ERROR",
					class: "iziToast-danger",
					position: "topRight",
					message:'Algo salio mal, recarga la página'
				});
				setTimeout(function(){
					location.reload();
				}, 1000);
			}else{
				$("#configuracion").modal("hide");
				$(".modal-backdrop").removeClass("show");
				iziToast.show({
					title: "SUCCESS",
					titleColor: "#1DC74C",
					color: "#FFF",
					class: "text-success",
					position: "topRight",
					message: "Se guardo tu configuracion."
				});
				if(this.rol!='admin'){
					setTimeout(function(){
						location.reload();
					}, 1000);
				}else{
					this._router.navigate(["/votaciones"]);
				}
			}
		});		

	}

	fileChangeEvent(event:any):void{
		var file :any;
		if(event.target.files && event.target.files[0]){
		  file = <File>event.target.files[0];
		}else{
		  iziToast.show({
			  title: 'ERROR',
			  titleColor: '#FF0000',
			  color: '#FFF',
			  class: 'text-danger',
			  position: 'topRight',
			  message: 'No hay un imagen de envio'
		  });
		}
	
		if(file.size <= 4000000){
	
		  if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){
		
			const reader = new FileReader();
			reader.onload = e => this.imgSelect = reader.result;
		   // //console.log(this.imgSelect);
			
			reader.readAsDataURL(file);
	
			$('#input-portada').text(file.name);
			this.file = file;
	
		  }else{
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'El archivo debe ser una imagen'
			});
			$('#input-portada').text('Seleccionar imagen');
			this.imgSelect = 'assets/img/01.jpg';
			this.file = undefined;
		  }
		}else{
		  iziToast.show({
			  title: 'ERROR',
			  titleColor: '#FF0000',
			  color: '#FFF',
			  class: 'text-danger',
			  position: 'topRight',
			  message: 'La imagen no puede superar los 4MB'
		  });
		  $('#input-portada').text('Seleccionar imagen');
		  this.imgSelect = 'assets/img/01.jpg';
		  this.file = undefined;
		}
		
	   // //console.log(this.file);
		
	  }

}