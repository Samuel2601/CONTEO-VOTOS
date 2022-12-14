var Distributivon = require('../models/Distributivon');
var Provincia = require('../models/Provincia');
var Canton = require('../models/Canton');
var Parroquia = require('../models/Parroquia');
var Zona = require('../models/Zona');
var Recinto = require('../models/Recinto');
var Dignidad = require('../models/Dignidad');
 
var Votacion = require('../models/Votacion');
var jwt = require('../helpers/jwt');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');

var Registro = require('../models/Registro');
var Dvotacion = require('../models/Dvotacion');

const registro_distributivon_masivo = async function(req,res){
    if(req.user){
        try {
            var data = req.body;
            
            
            let subidos=0;
            let resubidos=0;
            let resubidosc=0;
            let errorneos=0;
            let errorv=0;
            let contador={};
                contador.provincia=0;
                contador.canton=0;
                contador.parroquia=0;
                contador.zona=0;
                contador.recinto=0;
            //console.log(data.length);
            if(data.length>0){
                for(var i=0; i<data.length;i++){
                    var datai=data[i];
                    ////console.log(datai);
                    var pro={};
                    var can={};
                    var parr={};
                    var zon={};
                    var rec={};
                    try {
                            //Provincia

                        pro.codigo_provincia=datai.codigo_provincia;
                        pro.nombre_provincia=datai.nombre_provincia;

                        var reg_pro = await Provincia.find({codigo_provincia:datai.codigo_provincia});
                        if(reg_pro.length==0){
                            reg_pro = await Provincia.create(pro);
                            contador.provincia++;
                        }
                        

                        //Canton
                        reg_pro = await Provincia.find({codigo_provincia:datai.codigo_provincia});
                        ////console.log(reg_pro);

                        can.codigo_provincia=reg_pro[0]._id;

                        can.codigo_canton=datai.codigo_canton;
                        can.nombre_canton=datai.nombre_canton;

                        var reg_can = await Canton.find({codigo_canton:datai.codigo_canton});
                        if(reg_can.length==0){
                            reg_can = await Canton.create(can);
                            
                            contador.canton++;
                        }
                        

                        //Parroquia
                        reg_can = await Canton.find({codigo_canton:datai.codigo_canton});
                        ////console.log(reg_can);

                        parr.codigo_provincia=reg_pro[0]._id;
                        parr.codigo_canton=reg_can[0]._id;

                        parr.codigo_parroquia=datai.codigo_parroquia;
                        parr.nombre_parroquia=datai.nombre_parroquia;

                        var reg_parr = await Parroquia.find({codigo_parroquia:datai.codigo_parroquia});
                        if(reg_parr.length==0){
                            reg_parr = await Parroquia.create(parr);
                            contador.parroquia++;
                        }

                        //Zona
                        reg_parr = await Parroquia.find({codigo_parroquia:datai.codigo_parroquia});
                        ////console.log(reg_parr);

                        zon.codigo_provincia=reg_pro[0]._id;
                        zon.codigo_canton=reg_can[0]._id;
                        zon.codigo_parroquia=reg_parr[0]._id;

                        zon.codigo_zona=datai.codigo_zona;

                        if(zon.codigo_zona!='0'){
                            zon.nombre_zona=datai.nombre_zona;
                        }else{
                            zon.nombre_zona='vacio';
                        }

                        var reg_zon = await Zona.find({codigo_parroquia:reg_parr[0]._id,codigo_zona:datai.codigo_zona});
                        if(reg_zon.length==0){
                            reg_zon = await Zona.create(zon);
                            
                            contador.zona++;
                        }
                        

                        //Recinto
                        reg_zon = await Zona.find({codigo_parroquia:reg_parr[0]._id,codigo_zona:datai.codigo_zona});
                        ////console.log(reg_zon);
                        rec.codigo_provincia=reg_pro[0]._id;
                        rec.codigo_canton=reg_can[0]._id;
                        rec.codigo_parroquia=reg_parr[0]._id;
                        rec.codigo_zona=reg_zon[0]._id;

                        rec.codigo_recinto=datai.codigo_recinto;
                        rec.nombre_recinto=datai.nombre_recinto;
                        rec.direccion_recinto=datai.direccion_recinto;
                        rec.telefono=datai.telefono;
                        rec.zona_utm=datai.zona_utm;
                        rec.coord_x=datai.coord_x;
                        rec.coord_y=datai.coord_y;
                        rec.long=datai.long;
                        rec.lat=datai.lat;
                        rec.u_r=datai.u_r;
                        rec.jun_fem=datai.jun_fem;
                        rec.jun_mas=datai.jun_mas;
                        rec.num_junr=datai.num_junr;
                        rec.jun_inif=datai.jun_inif;
                        rec.jun_finf=datai.jun_finf;
                        rec.jun_inim=datai.jun_inim;
                        rec.jun_finm=datai.jun_finm;
                        rec.numero_electores=datai.numero_electores;
                        var reg_rec = await Recinto.find({codigo_recinto:datai.codigo_recinto});
                        if(reg_rec.length==0){
                            reg_rec = await Recinto.create(rec);
                            ////console.log(reg_rec);
                            reg_rec = await Recinto.find({codigo_recinto:datai.codigo_recinto});
                            ////console.log(reg_rec);
                            contador.recinto++;
                        }
                    } catch (error) {
                        //console.log(error);
                        res.status(200).send({message:'Algo salió mal'});
                    }
                    
    
                        //var reg = await Distributivon.create(data[i]);
                }
                let registro={};
                registro.admin=req.user.sub;
                registro.tipo='Masivo';
                registro.accion='CREAR';
                registro.descripcion= {valor:data.length,s:contador,r:resubidos,rc:resubidosc,e:errorneos,ev:errorv};
                await Registro.create(registro);
                res.status(200).send({s:contador,r:resubidos,rc:resubidosc,e:errorneos,ev:errorv});
            }else{

                res.status(200).send({s:subidos,r:resubidos,rc:resubidosc,e:errorneos,ev:(-999)});
            }
                

           
            
        
           
        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'Algo salió mal'});
        }
    }else{
        res.status(200).send({message:'No Access'});
    }

}
const listar_distributivons= async function(req,res){
    if(req.user){
        var distributivons = await Recinto.find().populate('codigo_provincia').populate('codigo_canton').populate('codigo_parroquia').populate('codigo_zona').sort({createdAt:-1});
        res.status(200).send({data:distributivons});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const eliminar_distributivon_masivo = async function(req,res){
    if(req.user){
        try {
            var data = req.body;

            let subidos=0;
            let resubidos=0;
            let resubidosc=0;
            let errorneos=0;
            let errorv=0;
            let contador={};
                contador.provincia=0;
                contador.canton=0;
                contador.parroquia=0;
                contador.zona=0;
                contador.recinto=0;
            //console.log(data.length);

            if(data.length>0){
                for(var i=0; i<data.length;i++){
                    var datai=data[i];

                    try {
                        
                        //Recinto
                        var reg_rec = await Recinto.findById(datai._id);
                        if(reg_rec.length!=0){
                            reg_rec = await Recinto.findByIdAndDelete(datai._id);
                            contador.recinto++;
                        }
                        
                         
                    } catch (error) {
                        //console.log(error);
                        res.status(200).send({message:'Algo salió mal'});
                    }
                    
    
                      
                }
                        let registro={};
                        registro.admin=req.user.sub;
                        registro.tipo='Masivo';
                        registro.accion='ELIMINAR';
                        registro.descripcion= JSON.stringify(data);
                        await Registro.create(registro);

                res.status(200).send({con:contador});
            }else{

                res.status(200).send({s:subidos,r:resubidos,rc:resubidosc,e:errorneos,ev:(-999)});
            }
                

           
            
        
           
        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'Algo salió mal'});
        }
    }else{
        res.status(200).send({message:'No Access'});
    }

}

const listar_provincia= async function(req,res){
    if(req.user){
        var ver = await Provincia.find().sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const obtener_pronvicia = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Provincia.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_provincia = async function(req,res){
    if(req.user){
        var data = req.body;
        ////console.log(data);
        var ver = await Provincia.find({codigo_provincia:data.codigo_provincia});
        if(ver.length==0){
            var reg = await Provincia.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Provincia';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Provincia ya ingresada'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const listar_canton = async function(req,res){
    if(req.user){
        var ver = await Canton.find().sort({createdAt:-1});        
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}


const obtener_canton = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Canton.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_canton = async function(req,res){
    if(req.user){
        var data = req.body;
        ////console.log(data);
        var ver = await Canton.find({codigo_canton:data.codigo_canton});
        if(ver.length==0){
            var reg = await Canton.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Canton';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Canton ya ingresado'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }  
}

const listar_parroquia = async function(req,res){
    if(req.user){
        var ver = await Parroquia.find().sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const obtener_parroquia = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Parroquia.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_parroquia = async function(req,res){
    if(req.user){
        var data = req.body;
        ////console.log(data);
        var ver = await Parroquia.find({codigo_parroquia:data.codigo_parroquia});
        if(ver.length==0){
            var reg = await Parroquia.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Parroquia';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Parroquia ya ingresado'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }  
}

const listar_recinto = async function(req,res){
    if(req.user){
        var ver = await Recinto.find().sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_recinto_esp = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Recinto.find({codigo_zona:id}).sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const obtener_recinto = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Recinto.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_recinto = async function(req,res){
    if(req.user){
        var data = req.body;
        ////console.log(data);
        var ver = await Recinto.find({codigo_recinto:data.codigo_recinto});
        if(ver.length==0){
            var reg = await Recinto.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Recinto';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Recinto ya ingresado'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }  
}

const listar_zona = async function(req,res){
    if(req.user){
        var ver = await Zona.find().sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const obtener_zona = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Zona.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_zona = async function(req,res){
    if(req.user){
        var data = req.body;
        ////console.log(data);
        var ver = await Zona.find({codigo_parroquia:data.codigo_parroquia});
        ////console.log(ver);
        
        ver=ver.find((element)=>element.codigo_zona==data.codigo_zona);
        ////console.log(ver);
        if(ver==undefined||ver.length==0){
            var reg = await Zona.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Zona';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Zona ya ingresado'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }  
}


const listar_dignidad = async function(req,res){
    if(req.user){
        var ver = await Dignidad.find().populate('codigo_provincia').sort({createdAt:-1});
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const obtener_dignidad = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dignidad.findById(id);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const registro_dignidad = async function(req,res){
    if(req.user){
        var data = req.body;
        //console.log(data);
        var ver = await Dignidad.find({codigo_dignidad:data.codigo_dignidad});
        var ver2 = await Dignidad.find({nombre_dignidad:data.nombre_dignidad});
        if(ver.length==0 && ver2.length==0){
            var reg = await Dignidad.create(data);
            let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Dignidad';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({reg});
        }else{

            res.status(200).send({message:'Dignidad ya ingresada'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const modificar_dignidad = async function(req,res){
    if(req.user){
        let registro={};
        var id = req.params['id'];
        var data = req.body;
        //console.log(data);
        var ver = await Dignidad.findById(id);
        registro.anterior= JSON.stringify(ver);
        if(ver.length!=0){
            var reg = await Dignidad.updateOne({_id:id},{
                codigo_provincia:data.codigo_provincia,
                codigo_dignidad:data.codigo_dignidad,
                nombre_dignidad:data.nombre_dignidad,
                seleccion:data.seleccion,
                partido:data.partido
            });
            
            registro.admin=req.user.sub;
            registro.tipo='Dignidad';
            registro.accion='ACTUALIZAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);
            res.status(200).send({message:'Dignidad modificada'});
        }else{

            res.status(200).send({message:'Dignidad no existente'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const eliminar_dignidad = async function(req,res){
    if(req.user){
        let registro={};
        let registrodv={};
        var id = req.params['id'];
        
        //console.log(id);
        var ver = await Dignidad.findById(id);
        var vot = await Dvotacion.find({codigo_dignidad:id}).populate('votacion').populate('codigo_dignidad');
       
        console.log("APi:",vot);
        if(ver.length!=0 && vot.length!=0){

            registro.descripcion= JSON.stringify(ver);
            registrodv.descripcion=JSON.stringify(vot);
            registro.admin=req.user.sub;
            registrodv.admin=req.user.sub;
            
            var reg = await Dignidad.deleteOne({_id:id});
            try {
                var reg2 = await Dvotacion.deleteMany({codigo_dignidad:id});
                console.log("API2 eliminación: ",reg2)
                
            } catch (error) {
                console.log(error);
            }
            
            registro.tipo='Dignidad';
            registro.accion='ELIMINAR';
            registrodv.tipo='Dvotacion';
            registrodv.accion='ELIMINAR';

            
            await Registro.create(registro);
            await Registro.create(registrodv);
            
            res.status(200).send({message:'Dignidad Eliminada'});
        }else{
            res.status(200).send({message:'Dignidad no existente'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const registrar_votacion = async function(req,res){
    if(req.user){
        var data = req.body;
       // console.log(data);
        try {
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];
            data.portada = portada_name;
            var reg = await Votacion.create(data);
            
            //crear d votos
           /* var obj=data.contador;
            for (const property in obj) {
                console.log(`${property}: ${obj[property]}`);
                var j=obj[property];
                for(const property2 in j){
                  console.log('2',`${property2}: ${j[property2]}`);
                }
              }


            for (const key in data.contado) {
                if (Object.hasOwnProperty.call(data.contado, key)) {
                    const element = data.contado[key];
                    console.log("Elemento",element);
                }
            }
            */
            ////console.log("Registrado: ",reg);
            
            res.status(200).send({reg});
        } catch (error) {
            res.status(200).send({message: 'Algo anda mal'});
        }
       
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion = async function(req,res){
    if(req.user){
        var ver = await Votacion.find().populate('admin').populate('codigo_provincia').populate('codigo_canton').populate('codigo_parroquia').populate('codigo_zona').populate('codigo_recinto').sort({createdAt:-1});
        //console.log(ver);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion_esp_pro = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dvotacion.find().populate('votacion').populate('codigo_dignidad').sort({createdAt:-1});   
        var ver2 = ver.filter((element)=>element.votacion.codigo_provincia==id&&element.votacion.estado=='Verificado');
        //console.log('Provincia',ver2.length);
        res.status(200).send({data:ver2});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion_esp_can = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dvotacion.find().populate('votacion').populate('codigo_dignidad').sort({createdAt:-1});   
        var ver2 = ver.filter((element)=>element.votacion.codigo_canton==id&&element.votacion.estado=='Verificado');
        //console.log('Canton',ver2);
        res.status(200).send({data:ver2});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion_esp_parr = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dvotacion.find().populate('votacion').populate('codigo_dignidad').sort({createdAt:-1});   
        var ver2 = ver.filter((element)=>element.votacion.codigo_parroquia==id&&element.votacion.estado=='Verificado');
        console.log('Parroquia',ver2);
        res.status(200).send({data:ver2});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion_esp_zon = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dvotacion.find().populate('votacion').populate('codigo_dignidad').sort({createdAt:-1});   
        var ver2 = ver.filter((element)=>element.votacion.codigo_zona==id&&element.votacion.estado=='Verificado');
        console.log('Zona',ver2);
        res.status(200).send({data:ver2});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_votacion_esp_rec = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        //var ver = await Votacion.find({codigo_recinto:id}).populate('codigo_dignidad').sort({createdAt:-1});
        var ver = await Dvotacion.find().populate('votacion').populate('codigo_dignidad').sort({createdAt:-1});   
        var ver2 = ver.filter((element)=>element.votacion.codigo_recinto==id&&element.votacion.estado=='Verificado');
        console.log('Recinto',ver2);
        res.status(200).send({data:ver2});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_canton_pro = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Canton.find({codigo_provincia:id}).sort({createdAt:-1});        
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_parroquia_can = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Parroquia.find({codigo_canton:id}).sort({createdAt:-1});        
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}
const listar_zona_parr = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Zona.find({codigo_parroquia:id}).sort({createdAt:-1});        
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}

const listar_dignidad_esp = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var ver = await Dignidad.find({seleccion:id}).sort({createdAt:-1});
        console.log(ver);
        res.status(200).send({data:ver});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}


const obtener_portada = async function(req,res){
    var img = req.params['img'];


    fs.stat('./uploads/votaciones/'+img, function(err){
        if(!err){
            let path_img = './uploads/votaciones/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}
const obtener_portada_partido = async function(req,res){
    var img = req.params['img'];


    fs.stat('./uploads/partidos/'+img, function(err){
        if(!err){
            let path_img = './uploads/partidos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}
const registro_dvotacion = async function(req,res){
    if(req.user){
        var data = req.body;
        //console.log(data);
        var ver = await Dvotacion.find({votacion:data.votacion,codigo_dignidad:data.codigo_dignidad});
        if(ver.length==0){
            var reg = await Dvotacion.create(data);
            /*let registro={};
            registro.admin=req.user.sub;
            registro.tipo='Dignidad';
            registro.accion='CREAR';
            registro.descripcion= JSON.stringify(data);
            await Registro.create(registro);*/
            var vot = await Votacion.findById(data.votacion);
            if(vot.estado='Verificar'){
                await Votacion.updateOne({_id:data.votacion},{estado:'Verificado'});
            }
            res.status(200).send({reg});
        }else{
            res.status(200).send({message:'ERROR duplicado'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    obtener_portada,
    obtener_portada_partido,


    registro_distributivon_masivo,
    listar_distributivons,
    eliminar_distributivon_masivo,


    listar_dignidad, 
    listar_provincia,
    listar_canton,
    listar_parroquia,
    listar_recinto,
    listar_zona,
    listar_votacion,

    //LISTAS ESPECIFICAS

    listar_canton_pro,
    listar_parroquia_can,
    listar_zona_parr,


    listar_dignidad_esp,
    listar_recinto_esp,
    
    listar_votacion_esp_pro,
    listar_votacion_esp_can,
    listar_votacion_esp_parr,
    listar_votacion_esp_zon,
    listar_votacion_esp_rec,


    obtener_dignidad,
    obtener_pronvicia,
    obtener_parroquia,
    obtener_canton,
    obtener_zona,
    obtener_recinto,


    registro_dignidad,
    registro_provincia,
    registro_parroquia,
    registro_canton,
    registro_recinto,
    registro_zona,
    registrar_votacion,
    registro_dvotacion,

    modificar_dignidad,


    eliminar_dignidad,


    /*
    listar_distributivons_tienda,
    listar_dignidads_nuevos_publico,
    registro_distributivon,
    ,
    login_distributivon,
    obtener_distributivon_guest,
    actualizar_distributivon_admin,

    obtener_ordenes_distributivon,
    obtener_detalles_ordenes_distributivon,
    obtener_detalles_por_distributivon,
    comprobar_carrito_distributivon,
    consultarIDPago,
    registro_compra_distributivon,
    obtener_reviews_distributivon,
    enviar_mensaje_contacto,
    obtener_pension_distributivon_guest,
    crear_pension_distributivon,
    listar_votaciones_distributivons_tienda*/
}
/* listar_votaciones_distributivons_tienda = async function(req,res){
    if(req.user){
        var distributivons = await Pension.find().populate('iddistributivon');
        res.status(200).send({data:distributivons});
    }else{
        res.status(500).send({message: 'NoAccess'});
    } 
}







const listar_dignidads_nuevos_publico = async function(req,res){
    let reg = await Producto.find({estado: 'Publicado'}).sort({createdAt:-1}).limit(8);
    res.status(200).send({data: reg});
}

const registro_distributivon = async function(req,res){
    if(req.user){
        try {
            var data = req.body;
            var distributivons_arr = [];
            var pension= {};
            if(data!=undefined){

                distributivons_arr = await Distributivon.find({dni:data.dni});
                //////console.log(data);
                if(distributivons_arr.length == 0){
                    //////console.log(data);
                    var reg = await Distributivon.create(data);
                       /* let registro={};
                        //////console.log(req.user);
                        registro.admin=req.user.sub;
                        registro.distributivon=reg._id;
                        registro.tipo='creo';
                        registro.descripcion=
                        ' nombres: '+data.nombres+
                        ' apellidos: '+data.apellidos+
                        ' genero: '+data.genero+
                        ' f_nacimiento: '+data.f_nacimiento+
                        ' telefono: '+data.telefono+
                        ' dni: '+data.dni+
                        ' estado: '+data.estado+
                        ' curso: '+data.curso+
                        ' paralelo: '+data.paralelo;
                       // await Registro.create(registro);

                    let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
                    var fecha2=[], meses;
                    if(data.desc_beca==100){
                        
                        for (let j = 0; j < 10; j++) {
                            fecha2.push({
                                date: new Date(config.anio_lectivo).setMonth(
                                    new Date(config.anio_lectivo).getMonth() + j
                                )
                            });
                        }
                        var des=0;
                        fecha2.forEach(element => {
                            if(new Date(element.date).getMonth()==11){
                                des=1;
                            }
                        });
                        if(des==1){
                            if(data.num_mes_beca<=9){
                                meses=data.num_mes_beca;
                            }else{
                                meses=9;
                            }
                            
                        }else{
                            meses=data.num_mes_beca;
                        }
                       
                    }else{
                        meses=0;
                    }
                    
                    pension.paga_mat=data.paga_mat;
                   // pension.meses=meses;
                    pension.iddistributivon= reg.id;
                    pension.anio_lectivo= config.anio_lectivo;
                    pension.condicion_beca = data.condicion_beca;
                    pension.val_beca = data.val_beca;
                    pension.num_mes_beca = data.num_mes_beca;
                    pension.num_mes_res = data.num_mes_beca;
                    pension.desc_beca = data.desc_beca;
                    pension.matricula = data.matricula;
                    pension.curso = data.curso;
                    pension.paralelo = data.paralelo;
                    
                    //////console.log(pension);
                    var reg2 = await Pension.create(pension);
                  /*  registro={};
                        //////console.log(req.user);
                        registro.admin=req.user.sub;
                        registro.distributivon=reg._id;
                        registro.tipo='creo';
                        registro.descripcion=
                        ' condicion_beca: '+pension.condicion_beca+
                        ' desc_beca: '+pension.desc_beca+
                        ' val_beca: '+pension.val_beca+
                        ' num_mes_beca: '+pension.num_mes_beca+
                        ' num_mes_res: '+pension.num_mes_res+
                        ' curso: '+pension.curso+
                        ' paralelo: '+pension.paralelo;
                      //  await Registro.create(registro);
                    //////console.log(reg2);
                    res.status(200).send({message:'Distributivon agregado con exito'});
                }else{
                    if(distributivons_arr[0].estado=='Desactivado'){
                       let re= await Distributivon.updateOne({dni:data.dni},{
                            estado:'Activo',
                            genero:data.genero,
                            nombres:data.nombres,
                            apellidos:data.apellidos,
                            email:data.email,
                            telefono:data.telefono,
                            curso:data.curso,
                            paralelo:data.paralelo
                        });
                        let reg = await Distributivon.find({dni:data.dni});
                        let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
                        let pen = await Pension.find({iddistributivon:reg[0].id,anio_lectivo:config.anio_lectivo });
                        if(pen.length==0){
                            var fecha2=[], meses;
                            if(data.desc_beca==100){
                                
                                for (let j = 0; j < 10; j++) {
                                    fecha2.push({
                                        date: new Date(config.anio_lectivo).setMonth(
                                            new Date(config.anio_lectivo).getMonth() + j
                                        )
                                    });
                                }
                                var des=0;
                                fecha2.forEach(element => {
                                    if(new Date(element.date).getMonth()==11){
                                        des=1;
                                    }
                                });
                                if(des==1){
                                    if(data.num_mes_beca<=9){
                                        meses=data.num_mes_beca;
                                    }else{
                                        meses=9;
                                    }
                                    
                                }else{
                                    meses=data.num_mes_beca;
                                }
                            
                            }else{
                                meses=0;
                            }
                            pension.paga_mat=data.paga_mat;
                           // pension.meses=meses;
                            pension.iddistributivon= reg[0].id;
                            pension.anio_lectivo= config.anio_lectivo;
                            pension.condicion_beca = data.condicion_beca;
                            pension.val_beca = data.val_beca;
                            pension.num_mes_beca = data.num_mes_beca;
                            pension.num_mes_res = data.num_mes_beca;
                            pension.desc_beca = data.desc_beca;
                            pension.matricula = data.matricula;
                            pension.curso = data.curso;
                            pension.paralelo = data.paralelo;
                            
                            //////console.log(pension);
                            var reg2 = await Pension.create(pension);
                            res.status(200).send({message:'Reactivado'}); 
                        } else{
                            var fecha2=[], meses;
                            if(data.desc_beca==100){
                                
                                for (let j = 0; j < 10; j++) {
                                    fecha2.push({
                                        date: new Date(config.anio_lectivo).setMonth(
                                            new Date(config.anio_lectivo).getMonth() + j
                                        )
                                    });
                                }
                                var des=0;
                                fecha2.forEach(element => {
                                    if(new Date(element.date).getMonth()==11){
                                        des=1;
                                    }
                                });
                                if(des==1){
                                    if(data.num_mes_beca<=9){
                                        meses=data.num_mes_beca;
                                    }else{
                                        meses=9;
                                    }
                                    
                                }else{
                                    meses=data.num_mes_beca;
                                }
                            
                            }else{
                                meses=pen[0].meses;
                            }
                            await Pension.updateOne({iddistributivon:reg[0].id,anio_lectivo:config.anio_lectivo },{
                                paga_mat:data.paga_mat,
                                //meses:meses,
                                curso:data.curso,
                                paralelo:data.paralelo
                            });
                            res.status(200).send({message:'Reactivado existing pension'});
                        }
                                 
                    }else{
                    res.status(200).send({message:'El numero de cédula ya existe en la base de datos'});
                    }
                }
            }else{
                //////console.log(error);
                res.status(200).send({message:'Algo salió mal'});
            }
        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'Algo salió mal'});
        }
    }else{
        res.status(200).send({message:'No Access'});
    }

}
const registro_distributivon_masivo = async function(req,res){
    if(req.user){
        try {
            var data = req.body;
            
            
            let subidos=0;
            let resubidos=0;
            let resubidosc=0;
            let errorneos=0;
            let errorv=0;
            //let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
            if(data.length>0){
                for(var i=0; i<data.length;i++){
                    var reg = await Distributivon.create(data[i]);
                }
                res.status(200).send({s:subidos,r:resubidos,rc:resubidosc,e:errorneos,ev:errorv});
            }else{
                ////console.log("6",subidos);
                ////console.log("7",resubidos);
                ////console.log("8",resubidosc);
                ////console.log("9",errorneos);
                ////console.log("10",errorv);
                res.status(200).send({s:subidos,r:resubidos,rc:resubidosc,e:errorneos,ev:(-999)});
            }
                

           
            
        
           
        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'Algo salió mal'});
        }
    }else{
        res.status(200).send({message:'No Access'});
    }

}

const crear_pension_distributivon = async (req,res)=>{
    var data = req.body;
    var distributivons_arr = [];
    var pension= {};
    distributivons_arr = await Distributivon.find({_id:data.id});
    if(distributivons_arr.length == 1){
        let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
    
        pension.iddistributivon= data.id;
        pension.anio_lectivo= config.anio_lectivo;
        pension.condicion_beca = 'No';
        pension.val_beca = undefined;
        pension.num_mes_beca = undefined;
        pension.num_mes_res = undefined;
        pension.desc_beca = undefined;
        pension.matricula = undefined;
        
        //////console.log(pension);
        var reg2 = await Pension.create(pension);
        //////console.log(reg2);
        res.status(200).send({message:'Prensión creada con exito',data:reg2});
    }else{
    res.status(200).send({message:'Error no existe el distributivon',data:undefined});
    }
    
   
}



const login_distributivon = async function(req,res){
    var data = req.body;
    var distributivon_arr = [];

    distributivon_arr = await Distributivon.find({email:data.email});

    if(distributivon_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        //LOGIN
        let user = distributivon_arr[0];
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){

                if(data.carrito.length >= 1){
                    for(var item of data.carrito){
                        await Carrito.create({
                            cantidad:item.cantidad,
                            dignidad:item.dignidad._id,
                            variedad:item.variedad.id,
                            distributivon:user._id
                        });
                    }
                }

                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined}); 
            }
        });
 
    } 
}

const obtener_distributivon_guest = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        try {
            let distributivon = await Distributivon.findById({_id:id});
          //  //////console.log(distributivon);
            res.status(200).send({data:distributivon});
            
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    }else{

        res.status(500).send({message: 'NoAccess'});
    }
}
const obtener_pension_distributivon_guest = async function(req,res){
    var pen={};
    if(req.user){
        var id = req.params['id'];
        try {
            let distributivon = await Pension.find({iddistributivon:id});
           // //console.log("E",distributivon);
            pen = Object.assign(distributivon);
           
            ////console.log("P",pen);
            res.status(200).send({data:distributivon});
            
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    }else{

        res.status(500).send({message: 'NoAccess'});
    }
  
}
const obtener_config_admin = async (res)=>{
    let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
    //////console.log(config);
    res.status(200).send({data:config});
}

const actualizar_distributivon_admin = async function(req,res){

    if(req.user){
        var id = req.params['id'];
        let data = req.body;
        //////console.log(data);
                var reg = await Distributivon.updateOne({_id:id},{
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    telefono :data.telefono,
                    genero :data.genero,
                    email :data.email,
                    dni: data.dni,
                    curso:data.curso,
                    paralelo:data.paralelo  
                });
                let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
                var reg2 = await Pension.find({iddistributivon:id, anio_lectivo:config.anio_lectivo});
                //////console.log(reg2);
                try {
                    if(reg2.length==1){
                        var i=0;
                        var fecha2=[], meses;
                        if(data.desc_beca==100){
                            
                            for (let j = 0; j < 10; j++) {
                                fecha2.push({
                                    date: new Date(reg2[i].anio_lectivo).setMonth(
                                        new Date(reg2[i].anio_lectivo).getMonth() + j
                                    )
                                });
                            }
                            var des=0;
                            fecha2.forEach(element => {
                                if(new Date(element.date).getMonth()==11){
                                    des=1;
                                }
                            });
                            if(des==1){
                                if(data.num_mes_beca<=9){
                                    meses=data.num_mes_beca;
                                }else{
                                    meses=9;
                                }
                                
                            }else{
                                meses=data.num_mes_beca;
                            }
                           
                        }else{
                            meses=reg2[i].meses;
                        }
                        if(data.condicion_beca=='Si'){
                            if(reg2[i].num_mes_beca!=undefined){
                                var aux=reg2[i].num_mes_beca-data.num_mes_beca;
                                //////console.log(aux);
                                if(aux <=0) {
                                    var reg3 = await Pension.updateOne({_id:reg2[i]._id},{
                                        paga_mat:data.paga_mat,
                                        //meses:meses,
                                        matricula: data.matricula,
                                        condicion_beca: data.condicion_beca,
                                        desc_beca :data.desc_beca,
                                        val_beca: data.val_beca,
                                        num_mes_beca: data.num_mes_beca,
                                        num_mes_res: (reg2[i].num_mes_res+(data.num_mes_beca-reg2[i].num_mes_beca)),   
                                        curso:data.curso,
                                        paralelo:data.paralelo                  
                                    });
                                    res.status(200).send({message:'Actualizado con exito',data:reg3});
                                    
                                }else{
                                    if((reg2[i].num_mes_res-(reg2[i].num_mes_beca-data.num_mes_beca))>=0){
                                        var reg3 = await Pension.updateOne({_id:reg2[i]._id},{
                                            paga_mat:data.paga_mat,
                                           // meses:meses,
                                            matricula: data.matricula,
                                            condicion_beca: data.condicion_beca,
                                            desc_beca :data.desc_beca,
                                            val_beca: data.val_beca,
                                            num_mes_beca: data.num_mes_beca,
                                            num_mes_res: (reg2[i].num_mes_res-(reg2[i].num_mes_beca-data.num_mes_beca)), 
                                            curso:data.curso,
                                            paralelo:data.paralelo                     
                                        });
                                        res.status(200).send({message:'Actualizado con exito',data:reg3});
                                        
                                    }else{
                                    res.status(200).send({message:'Error de consistencia el número de meses con becas usados es mayor a los meses asignados'});
                                    
                                    }
                                }
                            }else{
                                
                                    var reg3 = await Pension.updateOne({_id:reg2[i]._id},{
                                        paga_mat:data.paga_mat,
                                        //meses:meses,
                                        matricula: data.matricula,
                                        condicion_beca: data.condicion_beca,
                                        desc_beca :data.desc_beca,
                                        val_beca: data.val_beca,
                                        num_mes_beca: data.num_mes_beca,
                                        num_mes_res: data.num_mes_beca,   
                                        curso:data.curso,
                                        paralelo:data.paralelo                   
                                    });
                                    res.status(200).send({message:'Actualizado con exito',data:reg3});
                               
                                
                                
                            }
                            
        
        
                        }else{
                            var reg3 = await Pension.updateOne({_id:reg2[i]._id},{
                                condicion_beca: 'No',
                                desc_beca :'',
                                val_beca:'',
                                num_mes_beca:'',
                                num_mes_res:'',
                                curso:data.curso,
                                paralelo:data.paralelo  
                            });
                            //////console.log(reg3);             
                            res.status(200).send({message:'Actualizado con exito',data:reg3});
                            
                        }
                    }else{
                        res.status(200).send({message:'Pension no encontrada, algo salió mal'});
                    }
                } catch (error) {
                    res.status(200).send({message:'Algo salió mal'});
                }
                    
                
                
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}




//---METODOS PUBLICOS----------------------------------------------------



const obtener_ordenes_distributivon  = async function(req,res){
    if(req.user){
        var id = req.params['id'];
     
        let reg = await Pago.find({distributivon:id}).sort({createdAt:-1});
        res.status(200).send({data:reg});   
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const enviar_email_pedido_compra = async function(pago){
    try {
        var readHTMLFile = function(path, callback) {
            fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };
    
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'diegoalonssoac@gmail.com',
                pass: 'dcmplvjviofjojgf'
            }
        }));
    
     
        var orden = await Pago.findById({_id:pago}).populate('distributivon').populate('direccion');
        var dpago = await Dpago.find({pago:pago}).populate('dignidad').populate('variedad');
    
    
        readHTMLFile(process.cwd() + '/mails/email_pedido.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dpago:dpago});
    
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: 'diegoalonssoac@gmail.com',
                to: orden.distributivon.email,
                subject: 'Gracias por tu orden, Prágol.',
                html: htmlToSend
            };
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    //////console.log('Email sent: ' + info.response);
                }
            });
        
        });
    } catch (error) {
        //////console.log(error);
    }
} 


const obtener_detalles_ordenes_distributivon  = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        //////console.log(id.toString());
        try {
            let pago = await Pago.findById({_id:id}).populate('distributivon').populate('encargado');
            let detalles = await Dpago.find({pago:pago._id}).populate('dignidad');
            res.status(200).send({data:pago,detalles:detalles});

        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'No tiene votaciones', data:undefined});
        }
            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
const obtener_detalles_por_distributivon  = async function(req,res){

    if(req.user){
        let detalles=[];
        var id = req.params['id'];
        //////console.log(id.toString());
        try {
            let pago = await Pago.find({distributivon:id});
            //////console.log(pago);
            for(let i of pago){
                //////console.log(i._id);
                var aux = await Dpago.find({pago:i._id});
                //////console.log(aux);
                for(let k of aux){
                    detalles.push({
                        idpension:k.idpension,
                        dignidad:k.dignidad,
                        valor:k.valor,
                        tipo:k.tipo,
                        estado:k.estado,
                        pago:k.pago
                    }); 
                }
              
                //////console.log(detalles);
            }
            res.status(200).send({data:pago,detalles:detalles});

        } catch (error) {
            //////console.log(error);
            res.status(200).send({message:'No tiene votaciones', data:undefined});
        }
            
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const emitir_review_producto_distributivon  = async function(req,res){
    if(req.user){
        let data = req.body;
        let reg = await Review.create(data);
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_review_producto_distributivon  = async function(req,res){
    let id = req.params['id'];
    let reg = await Review.find({dignidad:id}).sort({createdAt:-1});
    res.status(200).send({data:reg});
}

const obtener_reviews_producto_publico = async function(req,res){
    let id = req.params['id'];

    let reviews = await Review.find({dignidad:id}).populate('distributivon').sort({createdAt:-1});
    res.status(200).send({data: reviews});
}


const comprobar_carrito_distributivon = async function(req,res){
    if(req.user){
        try {
            var data = req.body;
            var detalles = data.detalles;
            let access = false;
            let producto_sl = '';

            for(var item of detalles){
                let variedad = await Variedad.findById({_id:item.variedad}).populate('dignidad');
                if(variedad.stock < item.cantidad){
                    access = true;
                    producto_sl = variedad.dignidad.titulo;
                }
            }

            if(!access){
                res.status(200).send({pago:true});
            }else{
                res.status(200).send({pago:false,message:'Stock insuficiente para ' + producto_sl});
            }
        } catch (error) {
            //////console.log(error);
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const consultarIDPago = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var votaciones = await Pago.find({transaccion:id});
        res.status(200).send({data:votaciones});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const registro_compra_distributivon = async function(req,res){
    if(req.user){

        var data = req.body;
        var detalles = data.detalles;

        data.estado = 'Procesando';

        let pago = await Pago.create(data);

        for(var element of detalles){
            element.pago = pago._id;
            await Dpago.create(element);

            let element_producto = await Producto.findById({_id:element.dignidad});
            let new_stock = element_producto.stock - element.cantidad;
            let new_votaciones = element_producto.nvotaciones + 1;

            let element_variedad = await Variedad.findById({_id:element.variedad});
            let new_stock_variedad = element_variedad.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.dignidad},{
                stock: new_stock,
                nvotaciones: new_votaciones
            });

            await Variedad.findByIdAndUpdate({_id: element.variedad},{
                stock: new_stock_variedad,
            });

            //limpiar carrito
            await Carrito.remove({distributivon:data.distributivon});
        }

        enviar_orden_compra(pago._id);

        res.status(200).send({data:pago});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_reviews_distributivon  = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let reg = await Review.find({distributivon:id}).populate('distributivon').populate('dignidad');
        res.status(200).send({data:reg});

    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const enviar_mensaje_contacto  = async function(req,res){
    let data = req.body;

    data.estado = 'Abierto';
    let reg = await Contacto.create(data);
    res.status(200).send({data:reg});

}

const enviar_orden_compra = async function(pago){
    try {
        var readHTMLFile = function(path, callback) {
            fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };
    
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'diegoalonssoac@gmail.com',
                pass: 'dcmplvjviofjojgf'
            }
        }));
    
     
        var orden = await Pago.findById({_id:pago}).populate('distributivon').populate('direccion');
        var dpago = await Dpago.find({pago:pago}).populate('dignidad').populate('variedad');
    
    
        readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html)=>{
                                
            let rest_html = ejs.render(html, {orden: orden, dpago:dpago});
    
            var template = handlebars.compile(rest_html);
            var htmlToSend = template({op:true});
    
            var mailOptions = {
                from: 'diegoalonssoac@gmail.com',
                to: orden.distributivon.email,
                subject: 'Confirmación de compra ' + orden._id,
                html: htmlToSend
            };
          
            transporter.sendMail(mailOptions, function(error, info){
                if (!error) {
                    //////console.log('Email sent: ' + info.response);
                }
            });
        
        });
    } catch (error) {
        //////console.log(error);
    }
} 
*/

