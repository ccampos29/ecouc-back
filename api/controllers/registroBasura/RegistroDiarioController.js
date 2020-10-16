/**
 * RegistroDiarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');

module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("createRegistroDiario")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        data=req.body;
        sails.log("esta es el usuario o token de registro diario ",req.token.id);
        sails.log("esta es el usuario o token de registro diario ",data);
        if(data){
            BoteBasura.findOne({codigoQr:data.codigoQr})
            .then((response)=>{
                if(response){
                    sails.log("este es el id de bote de basura ",response);
                    crearRegistroDiario(response.id, req.token.id, data.data, data.eventos)
                    .then(
                        (dato)=>{
                            if(dato){
                                res.json(dato);
                            }
                        },
                        (err)=>{
                            res.serverError(err);
                        }

                    );
                }else{
                    res.serverError("no se encontraron registros con el codigoQr");
                }
            })
            .catch((error)=>{
                res.serverError("hubo un error al tratar de recuperer datos del bote de basura");
            })
            
        }
      },
      viewAll(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        RegistroDiario.find().populate('boteBasuraFk').populate('userFk').populate('eventoXregistroDiarioCollection')
        .then((registro)=>{
            res.json(registro);
        })
        .catch((err)=>{
            res.serverError("no se encontro datos que mostrar ", err);
        })
      },
      viewOne(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewOnePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
    
        const data=req.body;

        let currentDate=new Date();
        let timeSevenInMilliseconds = daysToMilliseconds(5);//7 dias en milisegundos
        let subtractionFiveDays= currentDate.getTime() - timeSevenInMilliseconds;
        let dateRestaFiveDays=new Date(subtractionFiveDays);
        sails.log(' fecha 5 dias antes del actual ',dateRestaFiveDays.toLocaleString());
        if(!data){
            res.send("no se encontraron datos en el cuerpo del mensaje");
        }
        else{
            sails.log(data.user);
            RegistroDiario.find(
                {
                    userFk:data.user,
                    diaRecoleccion: { '>=': dateRestaFiveDays.toLocaleString()}
                }
            ).populate('boteBasuraFk').populate('userFk').populate('eventoXregistroDiarioCollection')
            .then((registro)=>{
                res.json(registro);
            })
            .catch((err)=>{
                res.serverError("no se encontro datos que mostrar ", err);
            })
        }
      },
      update(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("updatePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      },
      delete(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("deletePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      }
    
    };
    
    function daysToMilliseconds(days){
        return (1000 * 60 * 60 * 24) * days;
   }
function crearRegistroDiario(idBote,usuarioId, data, eventos){
    sails.log("id bote ",idBote);
    sails.log("usuario id", usuarioId);
    sails.log("data ",data.data);
    return new Promise(function(success, error){

        RegistroDiario.create({
            id:uuid.v4(),
            diaRecoleccion:data.diaRecoleccion,
            horaRecoleccion:data.horaRecoleccion,
            descripcion:data.descripcion,
            estadoBoteBasura:data.estadoBoteBasura,
            userFk:usuarioId,
            boteBasuraFk:idBote//->busca id de reporte basura a partir del codigo qr
        },function(err, registro){
            if(!registro){
                sails.log(registro);
                error("no se pudo crer al registro diario", err);
            }
            else{
                if(eventos!== null){
                    crearEventosExtrañosXregistroDiario(eventos, registro.id)
                    .then(
                        (data)=>{
                            if(data===true){
                                success({
                                    dataRegistro:registro,
                                    dataEventos:eventos
                                });
                            }
                        },
                        (err)=>{
                            error(err);
                        }
                    );
                }
                
                
            }
        },{fetch:true});

    });
}
function crearEventosExtrañosXregistroDiario(listEventos, idRegistroDiario){
    listaEventos=[];
    evento={};
    sails.log("lista de eventos extraños en crear eventos extraños ",listEventos)
    listEventos.forEach(element => {
        evento={
            id:uuid.v4(),
            descripcion:element.descripcion,
            registroDiarioFk:idRegistroDiario,
            tipoResiduoExtranoFk:element.tipoResiduoExtrano
        }
        listaEventos.push(evento);
    });
    return new Promise(function(success, error){
        EventoExtranoXregistroDiario.createEach(listaEventos)
        .then(
            ()=>{
                success(true);
            }
        )
        .catch(
            ()=>{
                error("hubo un problema al crear el o los eventos extraños");
            }
        )

    });

}