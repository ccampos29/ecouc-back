/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid=require('uuid');

module.exports = {

  create(req, res){
    //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
    if(!req.permissions.includes("createPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
    
    data=req.body;
    sails.log("esta es la carga de group ",data);
    if(data){
        Permission.create({
            id:uuid.v4(),
            name:data.name,
            description:data.description,
        },function(err, permission){
            if(!permission){
                sails.log(permission);
                return res.serverError("algo salio mal es posible que ya se halla registrado el permiso");
            }
            else{
                res.json(permission);
            }
        },{fetch:true});
    }
  },
  viewAll(req, res){
    //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
    if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
    
    Permission.find().populate('permissionXuserCollection')
    .then((permission)=>{
        res.json(permission);
    })
    .catch((err)=>{
        res.serverError("no se encontro datos que mostrar ", err);
    })
  },
  viewOne(req, res){
    //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
    if(!req.permissions.includes("viewOnePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});

    const data=req.body;
    if(!data){
        res.send("no se encontraron datos en el cuerpo del mensaje");
    }
    else{
        sails.log(data.id);
        Permission.findOne({id:data.id}).populate('permissionXuserCollection')
        .then((permission)=>{
            res.json(permission);
        })
        .catch((err)=>{
            res.serverError("no se encontro datos que mostrar ", err);
        })
    }
  },
  update(req, res){
    //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
    if(!req.permissions.includes("updatePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
  },
  delete(req, res){
    //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
    if(!req.permissions.includes("deletePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
  }

};

