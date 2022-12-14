import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";
import Chart, { ChartDataset } from "chart.js/auto";
import { TableUtil } from "./tableUtil";
import { forEach } from "jszip";
import { GLOBAL } from "src/app/service/GLOBAL";



//import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

declare var iziToast: any;
declare var $: any;

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent implements OnInit {
	

	public dignidads: Array<any> = [];
	public dignidads_const: Array<any> = [];
	public ventas: Array<any> = [];
	public const_ventas: Array<any> = [];
	public distributivons: Array<any> = [];
	public const_distributivons: Array<any> = [];
	public token = localStorage.getItem("token");
	public page = 1;
	public pageSize = 50;
	public filtro = "";
	public desde: any = undefined;
	public hasta: any = undefined;
	public url = GLOBAL.url;
	public load_ventas = false;
	public load_dignidads = false;
	public load_distributivons = false;
	public load_administrativo = false;
	public load_registro = false;
	public nmt = 0;
	public df=1;
	public meses = new Array(
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	); 
		backgroundColor= [
			'rgba(192, 57, 43,0.2)',

		'rgba(155, 89, 182, 0.2)',

		'rgba(41, 128, 185 , 0.2)',

		'rgba(26, 188, 156, 0.2)',

		'rgba(241, 196, 15, 0.2)',

		'rgba(230, 126, 34, 0.2)',

		'rgba(52, 73, 94 , 0.2)',



		'rgba(255, 99, 132, 0.2)',

		'rgba(75, 192, 192, 0.2)',

		'rgba(255, 205, 86, 0.2)',

		'rgba(255, 159, 64, 0.2)',

		'rgba(54, 162, 235, 0.2)',

		'rgba(153, 102, 255, 0.2)',

		'rgba(201, 203, 207, 0.2)'
	  ];
	  borderColor= [
		'rgba(192, 57, 43)',

		'rgba(155, 89, 182)',

		'rgba(41, 128, 185)',

		'rgba(26, 188, 156)',

		'rgba(241, 196, 15)',

		'rgba(230, 126, 34)',

		'rgba(52, 73, 94)',


		'rgb(255, 99, 132)',

		'rgb(75, 192, 192)',

		'rgb(255, 205, 86)',

		 'rgb(255, 159, 64)',

		'rgb(54, 162, 235)',

		'rgb(153, 102, 255)',

		'rgb(201, 203, 207)'
	  ];
	public factual = new Date().setMonth(new Date().getMonth());
	public auxfactual = new Date(this.factual).getMonth();
	public mactual = new Date().getMonth();
	public idmactual: Array<any> = [];
	public faux = new Date().setFullYear(new Date().getFullYear() - 1);
	public totalfaux = 0;
	public totalfactual = 0;
	public votacionesmes = 0;

	public sobrante = 0;

	public datosventa = {};
	public anio: Array<any> = [];
	public auxanio: Array<any> = [];

	public votacionesdistributivon: any = [];
	public votacionespension: any = [];
	public constvotacionespension: any = {};

	public recaudado: any = [];
	public myChart: Chart<"bar", number[], string> | any;
	public myChart3: Chart<"bar", number[], string> | any;
	public pagado = 0;
	public porpagar = 0;
	public deteconomico: any = [];
	public cursos: any = [];
	public cursos2: any = [];
	public dignidad_arr: Array<any> = [];
	public resgistro_arr: Array<any> = [];
	public resgistro_const: Array<any> = [];
	public pdffecha = 0;
	public rol: any;
	public yo = 0;
	public director = "";
	public naadmin = "";
	public nadelegado = "";
	public load_data_est = true;
	public config: any = [];
	public penest: any = [];
	public fbeca = "";
	public active: any;


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
	public new_votacion: any = {};
	public c_new_votacion: any = {};
	public lav: any[];
	public arr_vot: any[];
	public con:any[];
	public cont=0;
	public tipo_seleccion=undefined;
	public mostrar_r:any={};
	public portada:any={};
	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		let aux = localStorage.getItem("identity");
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			this.rol = response.data.rol;
			if (this.rol == "admin") {
				this.naadmin = response.data.nombres + " " + response.data.apellidos;
			}
			if (response.data.email == "samuel.arevalo@espoch.edu.ec") {
				this.yo = 1;
			}
			if (this.rol == "admin") {
				this._adminService.listar_admin(this.token).subscribe((response) => {
					let respon = response.data;
					respon.forEach((element) => {
						if (element.rol == "direc") {
							this.director = element.nombres + " " + element.apellidos;
						}
						if (element.rol == "delegado") {
							this.nadelegado = element.nombres + " " + element.apellidos;
						}
					});
				});
				this.estadoventas();
			}
		});
	}
	
	llamada(){


		if(this.c_arr_parroquia.length==0){
			this._adminService.listar_parroquia(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_parroquia=response.data;
					this.arr_parroquia=this.c_arr_parroquia;
				}
			});
		}else{
			this.arr_parroquia=this.c_arr_parroquia;
		}
		if(this.c_arr_zona.length==0){
			this._adminService.listar_zona(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_zona=response.data;
					this.arr_zona=this.c_arr_zona;
				}
			});
		}else{
			this.arr_zona=this.c_arr_zona;
		}
		
		//this.new_votacion={};
		if(this.c_arr_provincia.length==0){
			this._adminService.listar_provincia(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_provincia=response.data;
					this.arr_provincia=this.c_arr_provincia;
					var df = this.arr_provincia.filter(
						(item) =>
							item.nombre_provincia=='ESMERALDAS'
					);
					if(df.length==1){
						this.new_recinto.codigo_provincia=df[0]._id;
						this.df=0;
						this.tipo_seleccion='PrefecturaViceprefectura';
						this.buscar_canton(df[0]._id);
						
						
					}
					
					
				}
			});
		}else{
			this.arr_provincia=this.c_arr_provincia;
		}
		
	

	}
	buscar_canton(provincia){
		//this.new_votacion={};
		if(provincia!=''){

			//this.arr_canton=this.c_arr_canton;
			////console.log(this.new_parroquia.codigo_provincia);
				this.new_recinto.codigo_provincia=provincia;
				this.new_recinto.codigo_canton='';
				this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				this.new_recinto.codigo_recinto='';
				this._adminService.listar_canton_pro(provincia,this.token).subscribe(response=>{
					if(response.data){
						this.arr_canton=response.data;
						document.getElementById('rec-canton').style.display="";
						$("#rec-canton").attr("disabled", false);
					
						if(this.df==0){
							this.filtrar_votos();
						}
					}
				});

		}else{
			this.new_recinto.codigo_canton='';
				this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				this.new_recinto.codigo_recinto='';
				this.filtrar_votos();
		}
		
			
	}
	buscar_parroquia(canton){
		//this.new_votacion={};
		if(canton!=''){
			
			this.arr_parroquia=this.c_arr_parroquia;
			////console.log(canton);
			
				this.new_recinto.codigo_canton=canton;
				this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				this.new_recinto.codigo_recinto='';
				this._adminService.listar_parroquia_can(canton,this.token).subscribe(response=>{
					if(response.data){
						this.arr_parroquia=response.data;

						document.getElementById('rec-parr').style.display="";
						$("#rec-parr").attr("disabled", false);

					}
				});
		}else{
			this.new_recinto.codigo_parroquia='';
				this.new_recinto.codigo_zona='';
				this.new_recinto.codigo_recinto='';
				this.filtrar_votos();
		}
	}
	buscar_zona(parroquia){
		//this.new_votacion={};
		if(parroquia!=''){
			
			this.arr_zona=this.c_arr_zona;
			////console.log(parroquia);
			

				this.new_recinto.codigo_parroquia=parroquia;
				this.new_recinto.codigo_zona='';
				this.new_recinto.codigo_recinto='';
				
				this._adminService.listar_zona_parr(parroquia,this.token).subscribe(response=>{
					if(response.data){
						this.arr_zona=response.data;

						document.getElementById('rec-zona').style.display="";
						$("#rec-zona").attr("disabled", false);

					}
				});
		}else{
			this.new_recinto.codigo_zona='';
			this.new_recinto.codigo_recinto='';
			this.filtrar_votos();
		}
	}
	buscar_reciento(id){
		if(id!=''){
			//this.new_votacion={};
			
			this.new_recinto.codigo_recinto='';
			this._adminService.listar_recinto_esp(id,this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_recinto=response.data;
					this.arr_recinto=this.c_arr_recinto;
					document.getElementById('rec-rec').style.display="";
					$("#rec-rec").attr("disabled", false);
				}
			});
		}else{
			this.new_recinto.codigo_recinto='';
			this.filtrar_votos();
		}
		
	}
	limpiar(){
		this.new_votacion={};
	}

	filtrar_votos():void{
		this.lav=[];
		var base=[];
		//if(this.c_new_votacion.length==0){
			this._adminService.listar_votacion_esp_pro(this.new_recinto.codigo_provincia, this.token).subscribe(response=>{
				if(response.data){
					this.c_new_votacion=response.data;

					if(this.tipo_seleccion){
						this.new_votacion=this.c_new_votacion.filter((element:any)=>
							this.tipo_seleccion==element.codigo_dignidad.seleccion
						);
					}
					console.log(this.new_votacion);
			
					if(this.new_recinto.codigo_recinto){
						this.new_votacion=this.new_votacion.filter((element:any)=>
						this.new_recinto.codigo_recinto==element.votacion.codigo_recinto
						);
						var rec=this.arr_recinto.filter((element:any)=>
							element._id==this.new_recinto.codigo_recinto);
						//console.log(rec);
						this.new_votacion=this.c_new_votacion.filter((element:any)=>
							this.tipo_seleccion==element.codigo_dignidad.seleccion
						);
						for(var i=parseInt(rec[0].jun_inif);i<=parseInt(rec[0].jun_finf);i++){
							this.lav.push((i).toString() + ' F');
						}
						for(var i=parseInt(rec[0].jun_inim);i<=parseInt(rec[0].jun_finm);i++){
							this.lav.push((i).toString()+ ' M');
						}
						base= new Array(this.lav.length);
						base.fill(0,0);
						//console.log(this.lav);
						//console.log(base);
						this.armador_grafica(this.lav,'Recinto',base);
						//tipo='Recinto';
						
			
					}else if(this.new_recinto.codigo_zona){
						this.new_votacion=this.new_votacion.filter((element:any)=>
						this.new_recinto.codigo_zona==element.votacion.codigo_zona
						);
						for(var i=0; i<this.arr_recinto.length;i++){
							if(i==0||this.lav.find(element=> element==this.arr_recinto[i].nombre_recinto)==undefined){
								this.lav.push({nombre:this.arr_recinto[i].nombre_recinto,codigo:this.arr_recinto[i]._id});
								base.push(0);
							}
						}
						//console.log(this.lav);
						//console.log(this.new_votacion);
						this.armador_grafica(this.lav,'Zona',base);
						//tipo='Zona';
						
					}else if(this.new_recinto.codigo_parroquia){
						this.new_votacion=this.new_votacion.filter((element:any)=>
						this.new_recinto.codigo_parroquia==element.votacion.codigo_parroquia
						);
						for(var i=0; i<this.arr_zona.length;i++){
							if(i==0||this.lav.find(element=> element==this.arr_zona[i].nombre_zona)==undefined){
								this.lav.push({nombre:this.arr_zona[i].nombre_zona,codigo:this.arr_zona[i]._id});
								base.push(0);
							}
						}
						//console.log(this.lav);
						//console.log(this.new_votacion);
						this.armador_grafica(this.lav,'Parroquia',base);
						//tipo='Parroquia';
						
					}else if(this.new_recinto.codigo_canton){
						this.new_votacion=this.new_votacion.filter((element:any)=>
						this.new_recinto.codigo_canton==element.votacion.codigo_canton
						);
						for(var i=0; i<this.arr_parroquia.length;i++){
							if(i==0||this.lav.find(element=> element==this.arr_parroquia[i].nombre_parroquia)==undefined){
								this.lav.push({nombre:this.arr_parroquia[i].nombre_parroquia,codigo:this.arr_parroquia[i]._id});
								base.push(0);
							}
						}
						//console.log(this.lav);
						//console.log(this.new_votacion);
						this.armador_grafica(this.lav,'Canton',base);
						///tipo='Canton';
						
					}else if(this.new_recinto.codigo_provincia){
						
						this.new_votacion=this.new_votacion.filter((element:any)=>
						this.new_recinto.codigo_provincia==element.votacion.codigo_provincia
						);
						
						for(var i=0; i<this.arr_canton.length;i++){
							////console.log(this.lav.find(element=> element==this.arr_canton[i].nombre_canton)==undefined);
							if(i==0||this.lav.find(element=> element==this.arr_canton[i].nombre_canton)==undefined){
								this.lav.push({nombre:this.arr_canton[i].nombre_canton,codigo:this.arr_canton[i]._id});
								
								base.push(0);
							}
						}
						//console.log(this.lav);
						this.armador_grafica(this.lav,'Provincia',base);
						//tipo='Provincia';
						
					}else{
						//console.log('seleccione un filtro');
					}
				}
			});
		/*}else{
			this.new_votacion=this.c_new_votacion;
		}*/

		

		
	}

	filtrar_seleccion(tipo){
		if(tipo){
			this.tipo_seleccion=tipo;
			this.filtrar_votos();
		}
	}
	armador_grafica(lav,tipo,base){
		this.con=new Array(base.length);

			this.con.fill(0,0);
		console.log(this.new_votacion);
		this.arr_vot=[];
		this.portada=[];
		this.lav=lav;
		//console.log("base",base,"tipo",tipo,"Lav",lav);
		for(var i=0; i<this.new_votacion.length;i++){
			var auxcolor1 = Math.random() * 255;
			var auxcolor2 = Math.random() * 255;
			
			if(i==0||this.arr_vot.find((elemet:any)=>elemet.label==this.new_votacion[i].codigo_dignidad.nombre_dignidad)==undefined){
				
				this.portada.push({p:this.new_votacion[i].codigo_dignidad.partido});
				this.arr_vot.push({
					label:this.new_votacion[i].codigo_dignidad.nombre_dignidad,
					data: new Array(base.length),
					backgroundColor: this.backgroundColor[this.arr_vot.length],
					borderColor: this.borderColor[this.arr_vot.length],
					borderWidth: 2,
				});
				if(this.arr_vot[this.arr_vot.length-1].data){
					this.arr_vot[this.arr_vot.length-1].data.fill(0,0);
				}
				//console.log(this.new_votacion[i].conteo);
				
				let c=0;
				let d1='';
				switch(tipo){
					case 'Provincia':
						d1=this.new_votacion[i].votacion.codigo_canton;
						break;
					case 'Canton':
						d1=this.new_votacion[i].votacion.codigo_parroquia;
						break;
					case 'Parroquia':
						d1=this.new_votacion[i].votacion.codigo_zona;
						break;
					case 'Zona':
						d1=this.new_votacion[i].votacion.codigo_recinto;
						break;
					default:
						c=this.lav.indexOf(this.new_votacion[i].votacion.junta+' '+this.new_votacion[i].votacion.tipo_junta);
						//console.log(c);
						this.arr_vot[this.arr_vot.length-1].data[c]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[this.arr_vot.length-1].data[c];
						break;
				}
				if(tipo!='Recinto'){
					for(var j=1; j<this.lav.length;j++){
						
						if(this.lav[j].codigo==d1){
							//console.log("Codigo: "+this.lav[j].codigo,"voto:"+d1,this.lav[j].codigo==d1);
							c=j;
							break;
						}
					}
					this.arr_vot[this.arr_vot.length-1].data[c]=this.arr_vot[this.arr_vot.length-1].data[c]+parseInt(this.new_votacion[i].conteo);
				
				}
				
				
				
			//	this.arr_vot[i].data[c]=this.arr_vot[i].data[c]+1;
			}else if(this.arr_vot.find((elemet:any)=>elemet.label==this.new_votacion[i].codigo_dignidad.nombre_dignidad)!=undefined){
				let d=this.arr_vot.findIndex((elemet:any)=>elemet.label==this.new_votacion[i].codigo_dignidad.nombre_dignidad);
				let d2='';
				let c1=0;
				switch(tipo){
					case 'Provincia':
							 d2=this.new_votacion[i].votacion.codigo_canton;
							//this.arr_vot[d].data[c]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[d].data[c];
						break;
					case 'Canton':
						 d2=this.new_votacion[i].votacion.codigo_parroquia;
							//this.arr_vot[d].data[c]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[d].data[c];
						break;
					case 'Parroquia':
						 d2=this.new_votacion[i].votacion.codigo_zona;
							//this.arr_vot[d].data[c]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[d].data[c];
						break;
					case 'Zona':
						 d2=this.new_votacion[i].votacion.codigo_recinto;
							//this.arr_vot[d].data[c]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[d].data[c];
						break;
					default:
						 c1=this.lav.indexOf(this.new_votacion[i].votacion.junta+' '+this.new_votacion[i].votacion.tipo_junta);
							this.arr_vot[d].data[c1]=parseInt(this.new_votacion[i].conteo)+this.arr_vot[d].data[c1];
						break;
				}
				if(tipo!='Recinto'){
					for(var j=1; j<this.lav.length;j++){
						if(this.lav[j].codigo==d2){
							c1=j;
							break;
						}
					}
					this.arr_vot[d].data[c1]=this.arr_vot[d].data[c1]+parseInt(this.new_votacion[i].conteo);
				}

				
			}
			
		}
		//console.log(this.arr_vot);
		//console.log(this.portada);

		if (document.getElementById("myChart") != null) {
			var canvas = <HTMLCanvasElement>document.getElementById("myChart");

			var ctx: CanvasRenderingContext2D | any;
			ctx = canvas.getContext("2d");
			//var myChart: Chart<"bar", number[], string>;
			if (this.myChart) {
				this.myChart.destroy();
				// ////////console.log('Destruido');
			}
			this.myChart = new Chart(ctx, {
				type: "bar",
				data: {
					//labels: this.lav,
					datasets: this.arr_vot
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						},
					}
				}
			});
			if(tipo!='Recinto'){
				this.lav.forEach((element:any) => {
					this.myChart.data.labels.push(element.nombre);
				});
			}else{
				this.myChart.data.labels=this.lav;
			}
			//console.log(this.arr_vot);
			//console.log(this.lav);
			this.cont=0;
			
			this.arr_vot.forEach((element:any) => {
				
					for(var i=0; i<base.length;i++){
						this.con[i]=this.con[i]+element.data[i];
						this.cont=this.cont+element.data[i];
					}
							
			});
		
			//console.log(this.con);
			this.myChart.update();
			$("#modalRecinto").modal("hide");
			this.load_data_est = false;
		}
	}


	estadoventas(): void {
		this.arr_provincia=[];
		this.arr_parroquia=[];
		this.arr_canton=[];
		this.arr_recinto=[];
		this.arr_zona=[];
	
		this.c_arr_provincia=[];
		this.c_arr_parroquia=[];
		this.c_arr_canton=[];
		this.c_arr_recinto=[];
		this.c_arr_zona=[];
	
		this.load_provincia=false;
		this.load_parroquia=false;
		this.load_canton=false;
		this.load_recinto=false;
		this.load_zona=false;
	
		this.new_provincia = {};
		this.new_parroquia= {};
		this.new_canton = {};
		this.new_recinto = {};
		this.new_zona = {};
		this.new_votacion = {};
		this.c_new_votacion = {};
		this.lav=[];
		this.arr_vot=[];
		this.con=[];
		this.cont=0;
		this.tipo_seleccion=undefined;

		
		this.llamada();


		this.load_data_est = true;
		//this.auxanio = [];
		this.load_dignidads = false;
		this.load_distributivons = false;
		this.load_administrativo = false;
		this.load_registro = false;
		this.load_ventas = true;
		//this.ventas = [];
		//this.anio = [];

		//this.totalfactual = 0;
		//this.votacionesmes = 0;
		/*this._adminService.obtener_detallesvotaciones_admin(this.token).subscribe((response) => {
			this.ventas = response.data;
			// ////////console.log(response);
			////////console.log(this.ventas);
			if (this.ventas != undefined) {
				for (var i = 0; i < this.ventas.length; i++) {
					//////console.log("Año anterior",new Date(this.faux).getFullYear(),"Año actual",new Date(this.factual).getFullYear());
					//////console.log((new Date(this.ventas[i].createdAt).getFullYear()));
					//////console.log("Valor:", this.ventas[i].valor);
					if (
						new Date(this.ventas[i].createdAt).getFullYear() ==
							new Date(this.faux).getFullYear() &&
						this.ventas[i].pago.estado == "Registrado"
					) {
						// if(this.ventas[i].pago.transaccion=='PAGOMANUAL'){
						this.totalfaux = this.ventas[i].valor + this.totalfaux;
						//////console.log("Año Anterior:", this.totalfaux);
						// }
					} else if (
						new Date(this.ventas[i].createdAt).getFullYear() ==
							new Date(this.factual).getFullYear() &&
						this.ventas[i].pago.estado == "Registrado"
					) {
						// if(this.ventas[i].pago.transaccion=='PAGOMANUAL'){
						this.totalfactual += this.ventas[i].valor;
						//////console.log("Año Actual:", this.totalfactual);
						//}
					}

					if (
						i == 0 &&
						new Date(this.ventas[i].createdAt).getFullYear() ==
							new Date(this.factual).getFullYear()
					) {
						this.anio.push({
							label:
								new Date(this.ventas[i].idpension.anio_lectivo).getFullYear().toString() +
								" " +
								this.ventas[i].idpension.curso +
								this.ventas[i].idpension.paralelo +
								" " +
								this.ventas[i].distributivon.estado,
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							backgroundColor: "rgba(54,162,235,0.2)",
							borderColor: "rgba(54,162,235,1)",
							borderWidth: 2
						});
						this.anio[0].data[new Date(this.ventas[i].createdAt).getMonth()] =
							this.anio[0].data[new Date(this.ventas[i].createdAt).getMonth()] +
							this.ventas[i].valor;
					} else if (
						new Date(this.ventas[i].createdAt).getFullYear() ==
						new Date(this.factual).getFullYear()
					) {
						let aux =
							new Date(this.ventas[i].idpension.anio_lectivo).getFullYear().toString() +
							" " +
							this.ventas[i].idpension.curso +
							this.ventas[i].idpension.paralelo +
							" " +
							this.ventas[i].distributivon.estado;
						let con = -1;
						for (var j = 0; j < this.anio.length; j++) {
							if (this.anio[j].label.toString() == aux) {
								con = j;
							}
						}
						if (con == -1) {
							var auxcolor1 = Math.random() * 255;
							var auxcolor2 = Math.random() * 255;

							this.anio.push({
								label:
									new Date(this.ventas[i].idpension.anio_lectivo)
										.getFullYear()
										.toString() +
									" " +
									this.ventas[i].idpension.curso +
									this.ventas[i].idpension.paralelo +
									" " +
									this.ventas[i].distributivon.estado,
								data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								backgroundColor: "rgba(" + auxcolor2 + "," + auxcolor1 + ",200,0.2)",
								borderColor: "rgba(" + auxcolor2 + "," + auxcolor1 + ",200,1)",
								borderWidth: 2
							});
							this.anio[this.anio.length - 1].data[
								new Date(this.ventas[i].createdAt).getMonth()
							] =
								this.anio[this.anio.length - 1].data[
									new Date(this.ventas[i].createdAt).getMonth()
								] + this.ventas[i].valor;
						} else {
							this.anio[con].data[new Date(this.ventas[i].createdAt).getMonth()] =
								this.anio[con].data[new Date(this.ventas[i].createdAt).getMonth()] +
								this.ventas[i].valor;
						}
					}
				}

				// ////////console.log(this.totalfaux);
				// ////////console.log(this.totalfactual);
				// ////////console.log(this.mactual);

				//  //////console.log(this.anio);

				// this.const_ventas = this.ventas;

				//// ////////console.log(myChart);

				// do {
				// //////console.log(document.getElementById('myChart'));
				if (document.getElementById("myChart") != null) {
					var canvas = <HTMLCanvasElement>document.getElementById("myChart");

					var ctx: CanvasRenderingContext2D | any;
					ctx = canvas.getContext("2d");
					//var myChart: Chart<"bar", number[], string>;
					if (this.myChart) {
						this.myChart.destroy();
						// ////////console.log('Destruido');
					}
					this.myChart = new Chart(ctx, {
						type: "bar",
						data: {
							labels: [
								"Enero",
								"Febrero",
								"Marzo",
								"Abril",
								"Mayo",
								"Junio",
								"Julio",
								"Agosto",
								"Septiembre",
								"Octubre",
								"Noviembre",
								"Dicembre"
							],
							datasets: []
						},
						options: {
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});

					this.anio.forEach((element) => {
						var fech: string = element.label;
						//todos
						this.myChart.data.datasets.push(element);
						//if(fech.includes((new Date().getFullYear()).toString())){
						this.auxanio.push(element);
						//del año
						//myChart.data.datasets.push(element);

						this.votacionesmes += element.data[this.auxfactual];
						//}
					});
					//this.auxanio=this.anio;
					this.auxanio = this.auxanio.sort(function (a, b) {
						if (
							a.label.charAt(5) + a.label.charAt(6) >
							b.label.charAt(5) + b.label.charAt(6)
						) {
							return 1;
						}
						if (
							a.label.charAt(5) + a.label.charAt(6) <
							b.label.charAt(5) + b.label.charAt(6)
						) {
							return -1;
						}
						// a must be equal to b
						return 0;
					});
					//////console.log(this.auxanio);
					this.myChart.update();
					this.load_data_est = false;
				}

				// } while ((document.getElementById('myChart')==null)||k<5);
			}
		});*/
	}

	estadodignidad(): void {
		this.load_data_est = true;

		this.sobrante = 0;
		this.load_ventas = false;
		this.load_dignidads = true;
		this.load_distributivons = false;
		this.load_registro = false;
		this.load_administrativo = false;
		this.dignidad_arr = [];
		//console.log('Dignidad');
		this.llamado_dignida();
		

		this.load_data_est = false;
	}
	llamado_dignida(){
		this.new_recinto=[];
		//this.c_arr_provincia=[];
		//console.log(this.c_arr_provincia);
		if(this.c_arr_provincia.length!=0){
			this.arr_provincia=this.c_arr_provincia;
			//console.log(this.arr_provincia);
			var df = this.arr_provincia.filter(
				(item) =>
					item.nombre_provincia=='ESMERALDAS'
			);
			if(df.length==1){
				this.new_recinto.codigo_provincia=df[0]._id;
				this.df=0;
				this.tipo_seleccion='PrefecturaViceprefectura';
				this.armadodignidad();
				
				
			}
		}else{
			this._adminService.listar_provincia(this.token).subscribe((response)=>{
				if(response.data!=undefined){
					this.c_arr_provincia=response.data;
					this.arr_provincia=this.c_arr_provincia;
					//console.log(this.arr_provincia);
					var df = this.arr_provincia.filter(
						(item) =>
							item.nombre_provincia=='ESMERALDAS'
					);
					if(df.length==1){
						this.new_recinto.codigo_provincia=df[0]._id;
						this.df=0;
						this.tipo_seleccion='PrefecturaViceprefectura';
						this.armadodignidad();
						
						
					}
				}
			});
		}
	}
	cambio_pro(prov){
		this.new_recinto.codigo_provincia=prov;
	}
	cambio_sele(prov){
		this.tipo_seleccion=prov;
	}
	public condig=0;
	armadodignidad(){
		var labels=[];
		this.dignidad_arr=[{
			data:[],
			backgroundColor:[],
			borderColor:[],
			borderWidth: 2,
			hoverOffset: 4,
		}];
		//console.log(this.tipo_seleccion);
		if(this.new_recinto.codigo_provincia!=''){
			if(!this.tipo_seleccion){
				this.tipo_seleccion='PrefecturaViceprefectura';
			}
			this._adminService.listar_votacion_esp_pro(this.new_recinto.codigo_provincia,this.token).subscribe(response=>{
				if(response.data){
					this.dignidads=response.data;
					//console.log(this.dignidads);
					this.dignidads=this.dignidads.filter((element:any)=>
						this.tipo_seleccion==element.codigo_dignidad.seleccion
					);
					this.dignidads.forEach(element => {
						if(!labels.find(element2=> element.codigo_dignidad.nombre_dignidad==element2)){
							labels.push(element.codigo_dignidad.nombre_dignidad);
							this.dignidad_arr[0].data.push(element.conteo);
							this.dignidad_arr[0].backgroundColor.push(this.backgroundColor[this.dignidad_arr[0].data.length-1]);
							this.dignidad_arr[0].borderColor.push(this.borderColor[this.dignidad_arr[0].data.length-1]);
						}else{
							
							var c = labels.findIndex(element2=>element.codigo_dignidad.nombre_dignidad==element2);
							this.dignidad_arr[0].data[c]=this.dignidad_arr[0].data[c]+element.conteo;
						}
					});
					
					if (document.getElementById("myChart2") != null) {
						var canvas = <HTMLCanvasElement>document.getElementById("myChart2");
			
						var ctx: CanvasRenderingContext2D | any;
						ctx = canvas.getContext("2d");
						//var myChart: Chart<"bar", number[], string>;
						if (this.myChart) {
							this.myChart.destroy();
							// ////////console.log('Destruido');
						}
						this.myChart = new Chart(ctx, {
							type: "polarArea",
							data: {
								labels: labels,
								datasets: [this.dignidad_arr[0]]
							},
							options: {
								
								scales: {
									y: {
										beginAtZero: true
									},
								}
							}
						});
						
						

						//console.log(this.arr_vot);

						//console.log(this.con);
						this.myChart.update();
						//$("#modalRecinto").modal("hide");
						//this.load_data_est = false;
					}
					//console.log(this.dignidad_arr);
				//	console.log(labels);
					this.dignidads_const=[];
					for(var i=0; i<this.dignidad_arr[0].data.length;i++){
						this.dignidads_const.push({'valor':this.dignidad_arr[0].data[i],'nombre':labels[i]});
					}
					this.condig=0;
					this.dignidads_const.forEach((element:any) => {
							
							this.condig+=element.valor;	
					});
					this.dignidads_const.sort(function(a,b){return b.valor-a.valor});
				//	console.log(this.dignidads_const);
				}
			});
		}
	}

	estadodistributivon(): void {
		this.load_data_est = true;
		this.load_administrativo = false;
		this.load_ventas = false;
		this.load_dignidads = false;
		this.load_distributivons = true;
		this.load_registro = false;

		let auxpen = [];
		/*this._adminService.obtener_detallesvotaciones_admin(this.token).subscribe((response) => {
			////////console.log(response.data);
			this.distributivons = response.data;
			this.const_distributivons = this.distributivons;
			// //////console.log(this.distributivons);
			this.distributivons.forEach((element) => {
				var aux =
					this.meses[new Date(element.idpension.anio_lectivo).getMonth()] +
					" " +
					new Date(element.idpension.anio_lectivo).getFullYear() +
					"-" +
					new Date(
						new Date(element.idpension.anio_lectivo).setFullYear(
							new Date(element.idpension.anio_lectivo).getFullYear() + 1
						)
					).getFullYear();

				var con = -1;

				for (var i = 0; i < this.votacionesdistributivon.length; i++) {
					if (this.votacionesdistributivon[i].label == aux) {
						con = i;
					}
				}
				if (con == -1) {
					this.votacionesdistributivon.push({
						label: aux,
						date: element.idpension.anio_lectivo
					});
				}
			});
			this.active=-1;
			this.detalle_data(this.votacionesdistributivon.length - 1);

			//this.myChart3.update();
			// ////////console.log(this.votacionesdistributivon);
		});*/
	}

	detalle_data(val: any) {
		
		
		if(this.active != val){
			this.active = val;
			if (this.myChart3) {
				this.myChart3.destroy();
				// ////////console.log('Destruido');
			}
			
			this.load_data_est = true;
			this.nmt = 0;
			this.pdffecha = this.votacionesdistributivon[val].label;
			this.fbeca = this.votacionesdistributivon[val].date;
			this.pagado = 0;
			this.porpagar = 0;
			this.votacionespension = [];
			this.cursos = [];
			this.deteconomico = [];
			let costopension = 0;
			let costomatricula = 0;
			/*this._adminService.obtener_config_admin().subscribe((responese) => {
				this.config = responese.data;
				this.distributivons.forEach((element) => {
					var aux =
						this.meses[new Date(element.idpension.anio_lectivo).getMonth()] +
						" " +
						new Date(element.idpension.anio_lectivo).getFullYear() +
						"-" +
						new Date(
							new Date(element.idpension.anio_lectivo).setFullYear(
								new Date(element.idpension.anio_lectivo).getFullYear() + 1
							)
						).getFullYear();
					if (this.votacionesdistributivon[val].label == aux) {
						if (
							element.tipo == 0 &&
							!element.estado.includes("Abono") &&
							element.idpension.condicion_beca == "No"
						) {
							costomatricula = element.valor;
						}
						if (
							element.tipo == 1 &&
							!element.estado.includes("Abono") &&
							element.idpension.condicion_beca == "No"
						) {
							costopension = element.valor;
						}
					}
					if (costopension < 1) {
						costopension = this.config.pension;
					}
					if (costomatricula < 1) {
						costomatricula = this.config.matricula;
					}
				});
	
				var aux =
					this.meses[new Date(this.config.anio_lectivo).getMonth()] +
					" " +
					new Date(this.config.anio_lectivo).getFullYear() +
					"-" +
					new Date(
						new Date(this.config.anio_lectivo).setFullYear(
							new Date(this.config.anio_lectivo).getFullYear() + 1
						)
					).getFullYear();
				if (this.votacionesdistributivon[val].label == aux) {
					this.nmt = this.config.numpension;
				} else {
					this.nmt = 10;
				}
				//this.nmt = 10;
	
				this._adminService
					.listar_distributivons(this.token)
					.subscribe((response) => {
						this.penest = response.data;
						//////console.log(this.penest);
						//////console.log(this.distributivons);
						if (this.penest != undefined) {
							this.penest.forEach((element: any) => {
								var aux =
									this.meses[new Date(element.anio_lectivo).getMonth()] +
									" " +
									new Date(element.anio_lectivo).getFullYear() +
									"-" +
									new Date(
										new Date(element.anio_lectivo).setFullYear(
											new Date(element.anio_lectivo).getFullYear() + 1
										)
									).getFullYear();
								// ////////console.log('Año:'+this.votacionesdistributivon[val]+'Auxiliar'+aux);
	
								if (this.votacionesdistributivon[val].label == aux) {
									var con = -1;
									for (var i = 0; i < this.votacionespension.length; i++) {
										if (this.votacionespension[i].label == element.curso + element.paralelo) {
											con = i;
										}
									}
									if (con == -1) {
										if (!this.cursos.includes(element.curso)) {
											this.cursos.push(element.curso);
										}
	
										this.votacionespension.push({
											label: element.curso + element.paralelo,
											num: 0,
											data: [0, 0]
										});
										////////console.log(this.votacionespension);
									}
								}
							});
							this.penest.forEach((element: any) => {
								//////console.log(element);
								if (
									element.iddistributivon.estado == "Activo" ||
									element.iddistributivon.estado == "Activado"
								) {
									var aux =
										this.meses[new Date(element.anio_lectivo).getMonth()] +
										" " +
										new Date(element.anio_lectivo).getFullYear() +
										"-" +
										new Date(
											new Date(element.anio_lectivo).setFullYear(
												new Date(element.anio_lectivo).getFullYear() + 1
											)
										).getFullYear();
									//////console.log('Año:'+this.votacionesdistributivon[val].label+'Auxiliar'+aux);
	
									if (this.votacionesdistributivon[val].label == aux) {
										this.votacionespension.forEach((elementpp: any) => {
											// ////console.log('Enviado:',element.curso+element.paralelo,'Comparado',elementpp.label);
											if (element.curso + element.paralelo == elementpp.label) {
												elementpp.num = elementpp.num + 1;
	
												if (element.condicion_beca == "Si") {
													if (
														new Date(element.anio_lectivo).getTime() ==
														new Date(this.config.anio_lectivo).getTime()
													) {
														for (var i = 1; i <= this.nmt; i++) {
															//console.log(
																"I Beca Si:",
																i,
																"CursoParalelo",
																element.curso + element.paralelo,
																"Tipo",
																element.iddistributivon.estado,
																"Condicion",
																element.condicion_beca,
																"Fecha 1:",
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i
																	)
																).getMonth(),
																"Fecha 2:",
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getMonth()
															);
															if (
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i - 1
																	)
																).getTime() ==
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getTime()
															) {
																elementpp.data[1] = elementpp.data[1] + this.config.pension;
																this.porpagar += this.config.pension;
															} else {
																if (element.num_mes_beca - i >= 0) {
																	elementpp.data[1] = elementpp.data[1] + element.val_beca;
																	this.porpagar += element.val_beca;
																} else {
																	elementpp.data[1] =
																		elementpp.data[1] + this.config.pension;
																	this.porpagar += this.config.pension;
																}
															}
														}
														if (element.paga_mat == 0) {
															elementpp.data[1] = elementpp.data[1] + this.config.matricula;
															this.porpagar += this.config.matricula;
														}
													} else {
														for (var i = 1; i <= this.nmt; i++) {
															//console.log(
																"I Beca si otro año:",
																i,
																"CursoParalelo",
																element.curso + element.paralelo,
																"Tipo",
																element.iddistributivon.estado,
																"Condicion",
																element.condicion_beca,
																"Fecha 1:",
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i
																	)
																).getMonth(),
																"Fecha 2:",
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getMonth()
															);
	
															if (
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i - 1
																	)
																).getTime() ==
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getTime()
															) {
																elementpp.data[1] = elementpp.data[1] + costopension;
																this.porpagar += costopension;
															} else {
																if (element.num_mes_beca - i >= 0) {
																	elementpp.data[1] = elementpp.data[1] + element.val_beca;
																	this.porpagar += element.val_beca;
																} else {
																	elementpp.data[1] = elementpp.data[1] + costopension;
																	this.porpagar += costopension;
																}
															}
														}
														if (element.paga_mat == 0) {
															elementpp.data[1] = elementpp.data[1] + costomatricula;
															this.porpagar += costomatricula;
														}
	
														// elementpp.data[1]=elementpp.data[1]+(element.val_beca*element.num_mes_beca)+((10-element.num_mes_beca)*costopension)+costomatricula;
	
														// this.porpagar+=(element.val_beca*element.num_mes_beca)+((10-element.num_mes_beca)*costopension)+costomatricula;
													}
												} else {
													// ////console.log("I Beca no:",i,"CursoParalelo",element.curso+element.paralelo,"Tipo",element.iddistributivon.estado,"Condicion",element.condicion_beca,"Fecha 1:",new Date(new Date(element.anio_lectivo).setMonth(new Date(element.anio_lectivo).getMonth() +i)).getMonth(),"Fecha 2:",new Date(new Date(element.anio_lectivo).setMonth(11)).getMonth());
	
													if (
														new Date(element.anio_lectivo).getTime() ==
														new Date(this.config.anio_lectivo).getTime()
													) {
														elementpp.data[1] =
															elementpp.data[1] +
															this.nmt * this.config.pension +
															this.config.matricula;
	
														this.porpagar +=
															this.nmt * this.config.pension + this.config.matricula;
													} else {
														elementpp.data[1] =
															elementpp.data[1] + 10 * costopension + costomatricula;
	
														this.porpagar += 10 * costopension + costomatricula;
													}
												}
											}
										});
									}
								} else if (element.iddistributivon.estado == "Desactivado") {
									var aux =
										this.meses[new Date(element.anio_lectivo).getMonth()] +
										" " +
										new Date(element.anio_lectivo).getFullYear() +
										"-" +
										new Date(
											new Date(element.anio_lectivo).setFullYear(
												new Date(element.anio_lectivo).getFullYear() + 1
											)
										).getFullYear();
									//////////console.log('Año:'+this.votacionesdistributivon[val].label+'Auxiliar'+aux);
	
									if (this.votacionesdistributivon[val].label == aux) {
										var auxmeses;
										let mes =
											(new Date(element.iddistributivon.f_desac).getFullYear() -
												new Date(element.anio_lectivo).getFullYear()) *
											12;
										mes -= new Date(element.anio_lectivo).getMonth();
										mes += new Date(element.iddistributivon.f_desac).getMonth();
										if (mes > 10) {
											auxmeses = 10;
										} else {
											auxmeses = mes + 1;
										}
										if (this.nmt < auxmeses) {
											auxmeses = this.nmt;
										}
										//////console.log(auxmeses);
	
										this.votacionespension.forEach((elementpp: any) => {
											////////console.log('Enviado:',element.curso+element.paralelo,'Comparado',elementpp.label);
											if (element.curso + element.paralelo == elementpp.label) {
												elementpp.num = elementpp.num + 1;
	
												if (element.condicion_beca == "Si") {
													if (
														new Date(element.anio_lectivo).getTime() ==
														new Date(this.config.anio_lectivo).getTime()
													) {
														for (var i = 1; i <= auxmeses; i++) {
															//////console.log("I:",i,"Tipo",element.iddistributivon.estado,"Condicion",element.condicion_beca,"Fecha 1:",new Date(new Date(element.anio_lectivo).setMonth(new Date(element.anio_lectivo).getMonth() +i)).getMonth(),"Fecha 2:",new Date(new Date(element.anio_lectivo).setMonth(11)).getMonth());
	
															if (
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i - 1
																	)
																).getTime() ==
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getTime()
															) {
																elementpp.data[1] = elementpp.data[1] + this.config.pension;
																this.porpagar += this.config.pension;
															} else {
																if (element.num_mes_beca - i >= 0) {
																	elementpp.data[1] = elementpp.data[1] + element.val_beca;
																	this.porpagar += element.val_beca;
																} else {
																	elementpp.data[1] =
																		elementpp.data[1] + this.config.pension;
																	this.porpagar += this.config.pension;
																}
															}
														}
														if (element.paga_mat == 0) {
															elementpp.data[1] = elementpp.data[1] + this.config.matricula;
															this.porpagar += this.config.matricula;
														}
													} else {
														for (var i = 1; i <= auxmeses; i++) {
															//////console.log("I:",i,"Tipo",element.iddistributivon.estado,"Condicion",element.condicion_beca,"Fecha 1:",new Date(new Date(element.anio_lectivo).setMonth(new Date(element.anio_lectivo).getMonth() +i)).getMonth(),"Fecha 2:",new Date(new Date(element.anio_lectivo).setMonth(11)).getMonth());
	
															if (
																new Date(
																	new Date(element.anio_lectivo).setMonth(
																		new Date(element.anio_lectivo).getMonth() + i - 1
																	)
																).getTime() ==
																new Date(
																	new Date(element.anio_lectivo).setMonth(11)
																).getTime()
															) {
																elementpp.data[1] = elementpp.data[1] + costopension;
																this.porpagar += costopension;
															} else {
																if (element.num_mes_beca - i >= 0) {
																	elementpp.data[1] = elementpp.data[1] + element.val_beca;
																	this.porpagar += element.val_beca;
																} else {
																	elementpp.data[1] = elementpp.data[1] + costopension;
																	this.porpagar += costopension;
																}
															}
														}
														if (element.paga_mat == 0) {
															elementpp.data[1] = elementpp.data[1] + costomatricula;
															this.porpagar += costomatricula;
														}
	
														// elementpp.data[1]=elementpp.data[1]+(element.val_beca*element.num_mes_beca)+((10-element.num_mes_beca)*costopension)+costomatricula;
	
														// this.porpagar+=(element.val_beca*element.num_mes_beca)+((10-element.num_mes_beca)*costopension)+costomatricula;
													}
												} else {
													for (var i = 1; i <= auxmeses; i++) {
														//////console.log("I:",i,"Tipo",element.iddistributivon.estado,"Condicion",element.condicion_beca,"Fecha 1:",new Date(new Date(element.anio_lectivo).setMonth(new Date(element.anio_lectivo).getMonth() +i)).getMonth(),"Fecha 2:",new Date(new Date(element.anio_lectivo).setMonth(11)).getMonth());
	
														if (
															new Date(
																new Date(element.anio_lectivo).setMonth(
																	new Date(element.anio_lectivo).getMonth() + i - 1
																)
															).getTime() ==
															new Date(
																new Date(element.anio_lectivo).setMonth(11)
															).getTime()
														) {
															elementpp.data[1] = elementpp.data[1] + costopension;
															this.porpagar += costopension;
														} else {
															if (element.num_mes_beca - i >= 0) {
																elementpp.data[1] = elementpp.data[1] + element.val_beca;
																this.porpagar += element.val_beca;
															} else {
																elementpp.data[1] = elementpp.data[1] + costopension;
																this.porpagar += costopension;
															}
														}
													}
													//if(element.matricula==0){
													elementpp.data[1] = elementpp.data[1] + costomatricula;
													this.porpagar += costomatricula;
													//}
	
													// if(new Date(element.anio_lectivo).getTime()==new Date(this.config.anio_lectivo).getTime()){
													//elementpp.data[1]=elementpp.data[1]+(auxmeses*this.config.pension)+this.config.matricula;
	
													//this.porpagar+=(auxmeses*this.config.pension)+this.config.matricula;
	
													//}else{
													// elementpp.data[1]=elementpp.data[1]+(10*costopension)+costomatricula;
	
													//this.porpagar+=(10*costopension)+costomatricula;
	
													//}
												}
											}
										});
									}
								}
							});
	
							//////console.log(this.distributivons);
							this.distributivons.forEach((element) => {
								if (element.tipo <= this.nmt) {
									var aux =
										this.meses[new Date(element.idpension.anio_lectivo).getMonth()] +
										" " +
										new Date(element.idpension.anio_lectivo).getFullYear() +
										"-" +
										new Date(
											new Date(element.idpension.anio_lectivo).setFullYear(
												new Date(element.idpension.anio_lectivo).getFullYear() + 1
											)
										).getFullYear();
									// ////////console.log('Año:'+this.votacionesdistributivon[val]+'Auxiliar'+aux);
									if (this.votacionesdistributivon[val].label == aux) {
										for (var k = 0; k < this.votacionespension.length; k++) {
											//console.log(
												"aNTES 1 Votaciones 0",
												this.votacionespension[k].data[0],
												"Votaciones 1",
												this.votacionespension[k].data[1]
											);
											if (
												this.votacionespension[k].label ==
												element.idpension.curso + element.idpension.paralelo
											) {
												//console.log(
													"Recuadado, Tipo:",
													element.tipo,
													"Curso y paralelo",
													element.idpension.curso + element.idpension.paralelo,
													"Beca:",
													element.idpension.condicion_beca,
													"Matricula:",
													element.idpension.matricula,
													"Valor: ",
													element.valor
												);
	
												this.votacionespension[k].data[0] =
													this.votacionespension[k].data[0] + element.valor;
												this.votacionespension[k].data[1] =
													this.votacionespension[k].data[1] - element.valor;
	
												this.pagado += element.valor;
												this.porpagar = this.porpagar - element.valor;
	
												k = this.votacionespension.length;
											}
										}
									}
								}
							});
							//////console.log(this.votacionespension);
							this.cursos = this.cursos.sort(function (a: any, b: any) {
								if (parseInt(a) > parseInt(b)) {
									return 1;
								}
								if (parseInt(a) < parseInt(b)) {
									return -1;
								}
								// a must be equal to b
								return 0;
							});
							// ////////console.log(this.cursos);
							this.cursos2 = [];
							this.cursos2.push("descr");
							this.cursos.forEach((element) => {
								this.cursos2.push(element);
							});
	
							// ////////console.log(this.cursos2);
							var datos1: any = [];
							var datos2: any = [];
							var datos3: any = [];
							this.cursos.forEach((element: any) => {
								datos1.push(0);
								datos2.push(0);
								datos3.push(0);
							});
							this.deteconomico.push({
								label: "N° de Distributivons",
								data: datos1,
								backgroundColor: "rgba(0,214,217,0.5)",
								borderColor: "rgba(0,214,217,1)",
								borderWidth: 2
							});
	
							this.deteconomico.push({
								label: "Valor Recaudado",
								data: datos2,
								backgroundColor: "rgba(0,217,97,0.5)",
								borderColor: "rgba(0,217,97,1)",
								borderWidth: 2
							});
							this.deteconomico.push({
								label: "Valor por Pagar",
								data: datos3,
								backgroundColor: "rgba(218,0,16,0.5)",
								borderColor: "rgba(218,0,16,1)",
								borderWidth: 2
							});
	
							////////console.log(this.votacionespension);
							this.votacionespension.forEach((elementp: any) => {
								for (var i = 0; i < this.cursos.length; i++) {
									// ////////console.log("i",i,"elementp.label",elementp.label,"this.cursos[i]",this.cursos[i],elementp.label.includes(this.cursos[i]));
									var aux = elementp.label.substring(0, elementp.label.length - 1);
									if (aux == this.cursos[i]) {
										// ////////console.log('Si');
										this.deteconomico.forEach((elementde: any) => {
											if (elementde.label == "N° de Distributivons") {
												// ////////console.log("Cuenta:",elementp.num);
												elementde.data[i] = elementde.data[i] + elementp.num;
											} else if (elementde.label == "Valor Recaudado") {
												// ////////console.log("Cuenta:",elementp.data[0]);
												elementde.data[i] = elementde.data[i] + elementp.data[0];
											} else {
												// ////////console.log("Cuenta:",elementp.data[1]);
												elementde.data[i] = elementde.data[i] + elementp.data[1];
											}
										});
										// ////////console.log(this.deteconomico);
										i = this.cursos.length;
									}
								}
							});
						}else{
							this.load_data_est=false;
						}
	
						/*this.cursos=this.cursos.sort(function(a:any,b:any){
				  if(parseInt(a)>parseInt(b)){
					return 1;
				  }
				  if (parseInt(a) < parseInt(b)) {
					return -1;
				  }
				  // a must be equal to b
				  return 0;
				});
						// ////////console.log(this.cursos);
						var canvas = <HTMLCanvasElement>document.getElementById("myChart3");
						var ctx: CanvasRenderingContext2D | any;
						ctx = canvas.getContext("2d");
	
						
						this.myChart3 = new Chart(ctx, {
							type: "bar",
							data: {
								labels: this.cursos,
								datasets: []
							},
							options: {
								scales: {
									y: {
										beginAtZero: true
									}
								}
							}
						});
						this.votacionespension = this.votacionespension.sort(function (a: any, b: any) {
							if (a.label > b.label) {
								return 1;
							}
							if (a.label < b.label) {
								return -1;
							}
							// a must be equal to b
							return 0;
						});
						// ////////console.log(this.votacionespension);
						/*
				this.votacionespension.forEach((element: any) => {
				  this.myChart3.data.datasets.push(element);
				});
				
						this.deteconomico.forEach((element: any) => {
							this.myChart3.data.datasets.push(element);
						});
	
						// ////////console.log(this.votacionespension);
						this.constvotacionespension = this.votacionespension;
						// ////////console.log(this.constvotacionespension);
						this.myChart3.update();
						this.load_data_est = false;
					});
			});
			
		}*/
	}
	}

	exportTabletotal(val: any) {
		
		this.cursos.forEach((element: any) => {
			document.getElementById("btncursos" + element).style.display = "none";
			document.getElementById(element).style.border = "1px solid";
			document.getElementById(element).style.width = "100%";
			document.getElementById(element).style.textAlign = "center";
		});
		document.getElementById("btncvs").style.display = "none";
		document.getElementById("btnxlsx").style.display = "none";
		document.getElementById("btnpdf").style.display = "none";

		document.getElementById("detalleeconomico").style.border = "1px solid";
		document.getElementById("detalleeconomico").style.width = "100%";

		TableUtil.exportToPdftotal(
			val.toString(),
			this.pdffecha.toString(),
			this.director,
			this.nadelegado,
			this.naadmin,
			new Intl.DateTimeFormat("es-US", { month: "long" }).format(new Date())
		);

		this.cursos.forEach((element: any) => {
			document.getElementById("btncursos" + element).style.display = "";
			document.getElementById(element).style.border = "";
			document.getElementById(element).style.tableLayout = "";
			document.getElementById(element).style.marginLeft = "";
		});
		document.getElementById("btncvs").style.display = "";
		document.getElementById("btnxlsx").style.display = "";
		document.getElementById("btnpdf").style.display = "";

		document.getElementById("detalleeconomico").style.border = "";
		document.getElementById("detalleeconomico").style.tableLayout = "";
	}

	exportTable(val: any) {
		if (val == "detalleeconomico") {
			TableUtil.exportToPdf(
				val.toString(),
				this.pdffecha.toString(),
				"Detalle Economico de votaciones",
				this.director,
				this.nadelegado,
				this.naadmin,
				new Intl.DateTimeFormat("es-US", { month: "long" }).format(new Date())
			);
		} else {
			if (val == "becados") {
				TableUtil.exportToPdf(
					val.toString(),
					this.pdffecha.toString(),
					"Becados: " + this.pdffecha,
					this.director,
					this.nadelegado,
					this.naadmin,
					new Intl.DateTimeFormat("es-US", { month: "long" }).format(new Date())
				);
			} else if (val == "eliminados") {
				TableUtil.exportToPdf(
					val.toString(),
					this.pdffecha.toString(),
					"Distributivons Eliminados: " + this.pdffecha,
					this.director,
					this.nadelegado,
					this.naadmin,
					new Intl.DateTimeFormat("es-US", { month: "long" }).format(new Date())
				);
			} else {
				TableUtil.exportToPdf(
					val.toString(),
					this.pdffecha.toString(),
					"Pago de Curso: " + val,
					this.director,
					this.nadelegado,
					this.naadmin,
					new Intl.DateTimeFormat("es-US", { month: "long" }).format(new Date())
				);
			}
		}
	}

	estadoadministrativo(): void {
		
		this.load_data_est = true;
		this.load_ventas = false;
		this.load_dignidads = false;
		this.load_distributivons = false;
		this.load_registro = false;
		this.load_administrativo = true;
		this._adminService.listar_registro(this.token).subscribe((response) => {
			this.resgistro_arr = response.data;
			this.resgistro_const = response.data;
			this.load_data_est = false;
			////////console.log( this.resgistro_arr);
		});
	}
	filtrar_dignidad() {
		this.load_data_est = true;
		if (this.filtro) {
			var term = new RegExp(this.filtro.toString().trim(), "i");
			this.resgistro_arr = this.resgistro_const.filter(
				(item) =>
					term.test(item.admin.email) || term.test(item.tipo) || term.test(item.createdAt)
			);
		} else {
			this.resgistro_arr = this.resgistro_const;
		}
		this.load_data_est = false;
	}

	armadoadmin(admin){
		this.mostrar_r={};
		this.mostrar_r.descripcion=JSON.parse(admin.descripcion);
		if(admin.anterior){
			this.mostrar_r.anterior=JSON.parse(admin.anterior);
			//this.coloreo();
		
		}
		console.log(this.mostrar_r);
	}
	coloreo(id){
		
			for(const item in this.mostrar_r?.descripcion){
				var lb = (item.toString()+id).toString();
				if(document.getElementById(lb)){
					document.getElementById(lb).style.backgroundColor = "#FFFFFF";	
				}
			}	
			for(const item in this.mostrar_r?.descripcion){
				var lb = (item.toString()+id).toString();
				//console.log(lb);
				//console.log(item, ":", this.mostrar_r.descripcion[item]==this.mostrar_r.anterior[item]);
				//console.log(document.getElementById(lb));
				//console.log(this.mostrar_r.descripcion[item]!=this.mostrar_r.anterior[item]&&document.getElementById(lb));
				if(this.mostrar_r?.descripcion[item]!=this.mostrar_r?.anterior[item]&&document.getElementById(lb)){

					document.getElementById(lb).style.backgroundColor = "#2C3E50  ";
				}
			}
		
	}

}
