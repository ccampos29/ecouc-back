/**
 * SedeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid=require('uuid');
module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("createProgramacionDia")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        data=req.body;
        if(data){
            Sede.create({
                id:uuid.v4(),
                nombre:data.nombre,
                direccion:data.direccion,
                descripcion:data.descripcion,
            }, function(err, sede) {
               if(!sede){
                    return res.serverError("no se encontro sedes que mostrar");
               }else{
                    return res.json(sede);
               }
            },{ fetch: true }); 
        };
    },
    viewAll(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
       Sede.find()
       .then(
            (sede)=>{
                if(sede){
                    res.json(sede);
                }else{
                    res.serverError("no se encontraron registros que mostrar");
                }
            }
       )
       .catch(
           (error)=>{
            res.serverError("error");
           }
       )
      },
      viewOne(req, res){
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


