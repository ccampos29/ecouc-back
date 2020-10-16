/**
 * FacultadXsedeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
uuid = require('uuid');
module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("createProgramacionDia")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        data=req.body;
        if(data){
            FacultadXsede.create({
                id:uuid.v4(),
                descripcion:data.descripcion,
                sedeFk:data.sede,
            }, function(err, facultadSede) {
               if(!facultadSede){
                    return res.serverError("no se encontro facultad por sede que mostrar");
               }else{
                    return res.json(facultadSede);
               }
            },{ fetch: true }); 
        };
    },
    viewAll(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
       FacultadXsede.find()
       .then(
            (dataFacultadXsede)=>{
                res.json(dataFacultadXsede);
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

