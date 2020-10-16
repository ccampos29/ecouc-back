/**
 * 
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');

module.exports = {
  create(req, res){
     //se verifica los permisos, la funcion includes retorna true false al comparar un valor con la lista de permission
     if(!req.permissions.includes("createPermissionXuser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      const data=req.body;
      if(data){
          PermissionXuser.create({
            id:uuid.v4(),
            userFk:data.userFk,
            permissionFk:data.permissionFk,
          },function(err, permisionXuser){
            if(!permisionXuser){
              return res.serverError("algo salio mal");
            }
            else{
              res.json(permisionXuser);
            }
          },{fetch:true});
      }
    },
    viewAll(req, res){
      //se verifica los permisos, la funcion includes retorna true false al comparar un valor con la lista de permission
      if(!req.permissions.includes("viewAllPermissionXuser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      PermissionXuser.find().populate('userFk').populate('permissionFk')
      .then((permissionXuser)=>{
        res.json(permissionXuser);
      })
      .catch((err)=>{
        res.serverError("no se encontraron datos que mostrar ", err);
      });

    },
    viewOne(req, res){
      //se verifica los permisos, la funcion includes retorna true false al comparar un valor con la lista de permission
      if(!req.permissions.includes("viewOnePermissionXuser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      const data=req.body;
      PermissionXuser.findOne({id:data.id}).populate('userFk').populate('permissionFk')
      .then((permissionXuser)=>{
        res.json(permissionXuser);
      })
      .catch((err)=>{
        res.serverError("no se encontraron datos que mostrar");
      }); 
    },
    update(req, res){
       //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
      if(!req.permissions.includes("updatePermissionXuser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
   
    },
    delete(req, res){
       //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
      if(!req.permissions.includes("deletePermissionXuser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
    
    }

};

