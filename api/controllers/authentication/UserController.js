'use strict'
const jwtToken = require('../../services/jwToken.js')

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//para decifrar el id de un modelo basta con .decrypt()

var uuid = require('uuid');
//const User = require('../../models/User');

module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("createUser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        const data =req.body;
        sails.log("datsaaaaa",data);
        if(data.password!==data.confirmPassword) return res.badRequest("la contraseña no es la misma");
        User.create({
            id:uuid.v4(),
            userName:data.username,
            email:data.email,
            password:data.password,
            confirmPassword:data.password,
            //admissionDate:null,
            active:true,
        },function(err, user){
            if(!user){
            sails.log("error ", err);
              return res.serverError("algo salio mal", err);
            }
            else{
              res.json(user);
            }
          },{fetch:true});
      },
    login(req, res){
        const data=req.body;
        sails.log("login ",data);
        //no necesita permisos, cualquiera que se pueda loguear obtiene el token
        if(!data.email || !data.password ) return res.badRequest('Se requiere correo electrónico y contraseña');
        
        User.findOne({email:data.email, active:true})//verifica que el correo corresponda y verifica que el parametro active sea true es decir que este activo
            .then((user)=>{

                if(!user) return res.serverError("Error en el correo o usuario bloqueado");
                
                User.comparePassword(data.password, user.password)
                    .then(()=>{            
                    //llama al metodo de promesa ya que si lo hago de modo convencional directo en el .then()
                    //genera problemas por sincronia por que son dos metodos que se hacen al mismo tiempo jwtToken.issue y el metodo para construir el paquete-> token,permisos y usuario para enviar al frontend         
                       encapsulateLoginData({id: user.id, userName:user.userName, token:jwtToken.issue({id:user.id}), email: user.email})//implementa la funcion que tiene la promesa la cual construye el json que va ser enviado al frontend
                        .then(
                            (data)=>{
                                return res.json({dataLoginSesion:data})
                            },
                            (err)=>{
                                return res.serverError(err);
                        });

                        
                     }).catch((err)=>{
                        return res.serverError("Error en el contraseña");
                });
            }).catch((err)=>{
                return res.serverError("Hubo un error o el usuario esta inactivo");
                });
    },
    viewAll(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("viewAllUser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        var listUser=[];
        var data={};
        User.find()//.where({active:true}) con esta sentencia filtra solo los usuarios que estan activos
        .then((userData)=>{
            userData.forEach(element => {
                data={
                    id:element.id,
                    userName:element.userName,
                    email:element.email,
                    active:element.active
                }
                listUser.push(data);
            });
            res.json(listUser);
        }).catch((err)=>{
            res.serverError("no se encontraron datos que mostrar ", err);
        })
        
    },   
    getUsers(req, res){
        var listUser=[];
        var data={};
        User.find()//.where({active:true}) con esta sentencia filtra solo los usuarios que estan activos
        .then((userData)=>{
            userData.forEach(element => {
                data={
                    id:element.id,
                    userName:element.userName,
                    email:element.email,
                    active:element.active
                }
                listUser.push(data);
            });
            res.json(listUser);
        }).catch((err)=>{
            res.serverError("no se encontraron datos que mostrar ", err);
        })
    },
    deactivate(req, res){
        const data=req.body;
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("deleteUser")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        User.update({id:data.id}).set({active:false})
        .then(()=>{
            User.findOne({id:data.id})
            .then((user)=>{
                if(user.active===false){
                    res.json({
                        deactivate:true,
                        id:user.id
                    })
                }
               
            }).catch((err)=>{
                res.serverError("hubo un error al modificar el estado del usuario");
            })
            
        })
        .catch(()=>{
            res.serverError('error en actualizar el parametro active');
        })
    } ,
    viewPermissionAndPosition(req, res){
        if(!req.permissions.includes("viewPermissionAndPosition")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        let positions=[];
        let dataPosition={};
        Permission.find()
        .then((permission)=>{
            DivisionPosition.find()
            .then((datpositions)=>{
                datpositions.forEach(element => {
                    dataPosition={name:element.name, id:element.id};
                    positions.push(dataPosition);
                });
                res.json({
                    permission,
                    position:positions
                });
            })
            .catch((err)=>{
                res.serverError("no se encontro divisiones que mostrar ", err);
            })
            
        })
        .catch((err)=>{
            res.serverError("no se encontro permisos que mostrar ", err);
        })
    }
};

function encapsulateLoginData(data){
   sails.log("esto es data ",data);
    let dataLoginResponse={};  

    return new Promise(function(success, error){

        searchPermission.search(data.userId, function(response){//arreglar un poco el metodo search en searchPermission
            if(!response){
                dataLoginResponse={
                    id: data.id,
                    token:data.token,
                    email:data.email,
                    username:data.userName,
                    permission:false
                }
                return success(dataLoginResponse);
            }
            else if(response=='err'){
                return error("hubo uun error ");
            }
            else{
                dataLoginResponse={
                    id: data.id,
                    token:data.token,
                    email:data.email,
                    username:data.userName,
                    permission:response
                }
                return success(dataLoginResponse);
            }
        });
        
    });
}


