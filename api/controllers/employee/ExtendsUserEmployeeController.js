'use strict'
const jwtToken = require('../../services/jwToken.js')
/**
 * ExtendsUserEmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');

module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("createUserExtendsUserEmployee")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        const data =req.body;
        if(data.password!==data.confirmPassword) return res.badRequest("la contraseña no es la misma");
        User.create({
            id:uuid.v4(),
            userName:data.username,
            email:data.email,
            password:data.password,
            confirmPassword:data.password,
            active:true,
        }, function(err, user) {
            if(!user){
                sails.log("esto es user",user);
                return res.serverError("algo salio mal no se pudo crear el usuario");
            }
            else{
                CreateExtensionUser(data.dataExtensionUser , user.id)//funcion que crea la extension del usuario
                .then(
                    (dataAddExtension)=>{
                        if(dataAddExtension){
                            sails.log("lo que contiene dataAddExtension ",dataAddExtension);
                            UpdateExtendUserEmployeeInUser(user.id, dataAddExtension.id)// funcion que actualiza extendUserEmployeeFk en user
                            .then(
                                (dataUpdate)=>{
                                    if(dataUpdate){
                                        AddPermissionXuser(data.permissions, user.id)//funcion que adiciona permisos por usuario
                                        .then(
                                            (data)=>{
                                                if(data){
                                                    sails.log("se creo el usuario con sus respectivos permisos",user);
                                                    sails.log("lo que contiene data ",data);
                                                    res.json({ token:jwtToken.issue({id:user.id}) });//la carga util es {id:user.id}                                    }
                                                }
                                            },
                                            (err)=>{
                                                if(err){
                                                    sails.log("lo que contiene err ",err);
                                                    res.serverError("hubo un error al intentar adicionar permisos por usuario");
                                                }
                                            }
                                        )
                                    }
                                },
                                (err)=>{
                                    res.serverError("Hubo un error al intentar actualizar la llave de la extension en usuario");
                                }
                            )
                        }
                    },
                    (err)=>{
                        if(err){
                            sails.log("lo que contiene err ",err);
                            res.serverError("Hubo un error al intentar crear formulario de extension empleado ");
                        }                    
                    }
                );           
            }
        },{ fetch: true }); 
    },
    viewOne(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("viewOneUserExtendsUserEmployee")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        const data=req.body;
        let userDat={};
        if(!data){
            res.serverError("no se encontraron datos en el cuerpo del mensaje");
        }
        else{//buscar en la tabla permissionsXuser en los permisos de un usuario, si es exitoso luego saca solamente los datos del usuario en otra consulta dentro de la primera 
            ExtendsUserEmployee.findOne({userFk:data.id}).populate('userFk').populate('divisionPositionfK')//posiblemente falta sacar pension, profecionalRisk, socialSegurity para visualizarse en la vista de un usuario en employeeViewOne en el cliente; User.findOne({id:data.id, active:true}) con esta sentencia filtra solo el usuario que este activo
            .then((userExtend)=>{
                sails.log(userExtend);
                if(!userExtend){
                    User.findOne({id:data.id})
                    .then((user)=>{ 
                        if(!user){
                            res.serverError("Hubo un error al tratar de buscar este usuario ");
                        }
                        else{
                            userDat={
                                userName:user.userName, 
                                email:user.email,
                                id:user.id,
                                active:user.active,
                                documentNumber: null, 
                                name: null,
                                lastName: null,
                                sex: null,
                                birthYear: null,
                                address: null,
                                neighborhood: null,
                                phoneNumber:null,
                                celphoneNumber: null,
                                hiringDate:null,
                                photo: null,
                                cityOfBirth: null,
                                profession: null,
                                contractModality:null,
                                netSalary:null,
                                divisionPosition: {name:null, id:null},
                                socialSegurity: {name:null, id:null},
                                profesionalRisks: {name:null, id:null},
                                pension: {name:null, id:null} 
                            }
                        }   
                    })
                    .catch((err)=>{
                        res.serverError("Hubo un error al tratar de buscar este usuario con la extension");
                    })               
                }
                else{
                    userDat={
                        userName:userExtend.userFk.userName, 
                        email:userExtend.userFk.email,
                        id:userExtend.userFk.id,
                        active:userExtend.userFk.active,
                        documentNumber: userExtend.documentNumber, 
                        name: userExtend.name,
                        lastName: userExtend.lastName,
                        sex: userExtend.sex,
                        birthYear: userExtend.birthYear,
                        address: userExtend.address,
                        neighborhood: userExtend.neighborhood,
                        phoneNumber:userExtend.phoneNumber,
                        celphoneNumber: userExtend.celphoneNumber,
                        hiringDate:userExtend.hiringDate,
                        photo: userExtend.photo,
                        cityOfBirth: userExtend.cityOfBirth,
                        profession: userExtend.profession,
                        contractModality:userExtend.contractModality,
                        netSalary:userExtend.netSalary,
                        divisionPosition: VerifyDataFk(userExtend.divisionPositionfK),
                        socialSegurity: VerifyDataFk(userExtend.socialSegurityfK),
                        profesionalRisks: VerifyDataFk(userExtend.profesionalRisksfK),
                        pension: VerifyDataFk(userExtend.pensionfK) 
                    };
                }
                PermissionXuser.find().where({userFk:data.id}).populate('permissionFk')
                .then((permissionXuser)=>{
                    if(permissionXuser.length>0){
                        res.json({//datos que se van a presentar al cliente, en user no se envia el objeto user completo ya que contiene password y fechas de creacion las cuales no se deberian enviar al cliente
                            permissions:permissionXuser,
                            user:userDat,
                        });
                    }
                    else{
                        res.json({
                            permissions:null,
                            user:userDat,
                        });
                    }          
                })
                .catch((err)=>{
                    res.serverError("hubo un error en la busqueda de permisos por usuario ", err);
                });
            })
            .catch((err)=>{
                res.serverError("hubo un error en la busqueda del usuario ", err)
            })
        }
    },
    // pasos que realiza update:
    // se crea o se actualiza extesion de usuario empleado
    // se actualiza usuario
    // se actualizan permisos
    update(req, res){
        const data=req.body;
        //se verifica los permisos, la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("updateUserExtendsUserEmployee")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        sails.log("dato del cuerpo para actualizacion ", data);
       
        UpdateOrCreateUserEmployee(data.extensionUser, data.user.id) 
        .then(
            (userEmployee)=>{
                if(userEmployee.create===true){
                    sails.log("entro despues de crear usuario");
                    User.update({id:data.user.id}).set({
                        userName:data.user.userName,
                        email:data.user.email,
                        active:data.user.active,
                        extendsUserEmployeeFK:userEmployee.employee.id
                    })
                    .then(()=>{       
                        //actualizar permisos
                        sails.log("permissions ",data.permissions);
                        sails.log("user ",data.user.id);
                        CreateOrUpdatePermissions(data.permissions, data.user.id)
                        .then(
                            (success)=>{
                                res.json("fue un exito la actualizacion de datos user, extend y permission");
                            },
                            (err)=>{
                                res.serverError("error al intentar ingresar los permisos cuando se creo una extension de usuario");
                            }
                        )              
                    })
                    .catch(()=>{
                        res.serverError("hubo un error al actualizar el usuario");
                    })                    
                }
                else{
                    User.update({id:data.user.id}).set({
                        userName:data.user.userName,
                        email:data.user.email,
                        active:data.user.active,
                    })
                    .then(()=>{       
                        //actualizar permisos
                        sails.log("permissions ",data.permissions);
                        sails.log("user ",data.user.id);
                        CreateOrUpdatePermissions(data.permissions, data.user.id)
                        .then(
                            (success)=>{
                                res.json("fue un exito la actualizacion de datos user, extend y permission");
                            },
                            (err)=>{
                                res.serverError("error al intentar ingresar los permisos cuando se creo una extension de usuario");
                            }
                        )              
                    })
                    .catch(()=>{
                        res.serverError("hubo un error al actualizar el usuario");
                    })         
                }
            },
            (err)=>{
                res.serverError("hubo un error en actualizar datos extension de employee");
            }
        )   
    },   
};
function CreateOrUpdatePermissions(dataPermissions, userId){
    let permissions=[];
    if(dataPermissions===null){
        permissions=dataPermissions;
    }
    else{
        dataPermissions.forEach(element => {
            permissions.push(element.id);
        });
    }
    return new Promise(function(fulfill, reject){
        if(permissions!==null){
            PermissionXuser.count({userFk:userId},function(error, permissionXuserCount){// consulta en caso que el usuario halla modificado los permisos 
                sails.log("cantidad usuarios ",permissionXuserCount);
                if(permissionXuserCount>0){
                    sails.log("si hay que modificar los permisos ");
                    PermissionXuser.destroy({userFk:userId})// consulta destruye los permissionXuser que hallan en la tabla por el usuario elegido
                    .then((datePermission)=>{
                    //arreglar esto se puede ingresar los nuevos permisos por usuario masivamente
                        AddPermissionXuser(permissions, userId)
                        .then(
                            (success)=>{
                                if(success){
                                    return fulfill(true);
                                }
                            },
                            (err)=>{
                                return reject(true);
                            }
                        )
                    })
                    .catch((err)=>{
                        return reject("hubo un error al eliminar los permisos por usuario");
                    })    
                }
                else if(permissionXuserCount===0){
                    sails.log("entro cuando verifico que los permisos son vacios ",permissionXuserCount);
                    AddPermissionXuser(permissions, userId)
                    .then(
                        (success)=>{
                            if(success){
                                return fulfill(true);
                            }
                        },
                        (err)=>{
                            return reject(true);
                        }
                    )
                }
                
            })
        } 
        else{
            return fulfill(null);
        }          
    })
}
function VerifyDataFk(data) { // verifica que las claves foraneas en los modelos si son nulas no vallan a generar error al querer acceder a una variable
    if(data===null){
        return {name:null, id:null};
    }
    else{
        return {name:data.name, id:data.id};
    }
}
function VerifyEmpty(data){
    if(data===''){
        return null;
    }
    else{
        return data;
    }
}
function CreateExtensionUser(dataExtension, userId){
    sails.log("esta es toda la extencion del usuario enviada desde frontend ",dataExtension)
    sails.log("esta es userId ",userId)

    return new Promise(function(success, error){
        ExtendsUserEmployee.create({
            id: uuid.v4(),
            documentNumber: VerifyEmpty(dataExtension.documentNumber),
            name: VerifyEmpty(dataExtension.name),
            lastName: VerifyEmpty(dataExtension.lastName),
            sex: VerifyEmpty(dataExtension.sex),
            birthYear: VerifyEmpty(dataExtension.birthYear),
            address: VerifyEmpty(dataExtension.address),
            neighborhood: VerifyEmpty(dataExtension.neighborhood),
            phoneNumber: VerifyEmpty(dataExtension.phoneNumber),
            celphoneNumber: VerifyEmpty(dataExtension.celphoneNumber),
            //hiringDate: VerifyEmpty(dataExtension),
            photo: VerifyEmpty(dataExtension.photo),
            cityOfBirth: VerifyEmpty(dataExtension.cityOfBirth),
            profession: VerifyEmpty(dataExtension.profession),
            //contractModality: VerifyEmpty(dataExtension),
            //netSalary: VerifyEmpty(dataExtension),
            userFk: VerifyEmpty(userId),
            //socialSegurityfK: VerifyEmpty(dataExtension),
            //profesionalRisksfK: VerifyEmpty(dataExtension),
            //pensionfK: VerifyEmpty(dataExtension),
            divisionPositionfK: VerifyEmpty(dataExtension.divisionPosition),
        }, function(err, extendUser) {
            if(!extendUser){
                sails.log("esto es extencion user error ",extendUser)
               return error(false);
            }
            else{
                return success(extendUser);
            }
        },{ fetch: true }); 
    });
}
function UpdateExtendUserEmployeeInUser(userId, extendsUserEmployeeId){
    return new Promise(function(success, err){
        User.update({id:userId}).set({extendsUserEmployeeFK:extendsUserEmployeeId})
        .then(()=>{
            success(true);
        })
        .catch(()=>{
            err(true);
        })
    })
}
function AddPermissionXuser(permissions, userId) {
    let listPermissions=[]
    let dataPermissions={}
    sails.log("lo que tiene listPermission ",permissions);
    permissions.forEach(element => {//alista todos los permisos a crear masivamente
        dataPermissions={
            id:uuid.v4(),
            userFk:userId,
            permissionFk:element
        }
        listPermissions.push(dataPermissions);
    });
    return new Promise(function(success, error){
        sails.log("esto es data permisions ",listPermissions);
        PermissionXuser.createEach(listPermissions)
        .then(()=>{
            sails.log("entro al then de permissionxuser create each")
            return success(true);
        })
        .catch(()=>{
            return error(true);
        })      
    });
}
function UpdateOrCreateUserEmployee(dataExtension, dataId){
    sails.log("extension usuario ",dataExtension);
    sails.log("dataid ",dataId);
    return new Promise(function(fulfill, reject){
        ExtendsUserEmployee.findOne({userFk:dataId})//verifica que halla una extension de usuario empleado
        .then((userExtension)=>{
            if(!userExtension){
                ExtendsUserEmployee.create({ // solo si el usuario no tiene una extension de employee
                    id: uuid.v4(),
                    documentNumber: VerifyEmpty(dataExtension.documentNumber),
                    name: VerifyEmpty(dataExtension.name),
                    lastName: VerifyEmpty(dataExtension.lastName),
                    sex: VerifyEmpty(dataExtension.sex),
                    birthYear: VerifyEmpty(dataExtension.birthYear),
                    address: VerifyEmpty(dataExtension.address),
                    neighborhood: VerifyEmpty(dataExtension.neighborhood),
                    phoneNumber: VerifyEmpty(dataExtension.phoneNumber),
                    celphoneNumber: VerifyEmpty(dataExtension.celphoneNumber),
                    //hiringDate: VerifyEmpty(dataExtension),
                    photo: VerifyEmpty(dataExtension.photo),
                    cityOfBirth: VerifyEmpty(dataExtension.cityOfBirth),
                    profession: VerifyEmpty(dataExtension.profession),
                    //contractModality: VerifyEmpty(dataExtension),
                    //netSalary: VerifyEmpty(dataExtension),
                    userFk: dataId,
                    //socialSegurityfK: VerifyEmpty(dataExtension),
                    //profesionalRisksfK: VerifyEmpty(dataExtension),
                    //pensionfK: VerifyEmpty(dataExtension),
                    divisionPositionfK: VerifyEmpty(dataExtension.divisionPosition),
                }, function(err, extendUser) {
                    if(!extendUser){
                       return reject(true);
                    }
                    else{
                        return fulfill({employee:extendUser, create:true});
                    }
                },{ fetch: true });
            }
            else{
                ExtendsUserEmployee.update({userFk:dataId}).set({ // solo si el usuario tiene una extencion de employee actualiza
                    documentNumber: VerifyEmpty(dataExtension.documentNumber),
                    name: VerifyEmpty(dataExtension.name),
                    lastName: VerifyEmpty(dataExtension.lastName),
                    sex: VerifyEmpty(dataExtension.sex),
                    birthYear: VerifyEmpty(dataExtension.birthYear),
                    address: VerifyEmpty(dataExtension.address),
                    neighborhood: VerifyEmpty(dataExtension.neighborhood),
                    phoneNumber: VerifyEmpty(dataExtension.phoneNumber),
                    celphoneNumber: VerifyEmpty(dataExtension.celphoneNumber),
                    //hiringDate: VerifyEmpty(dataExtension.hiringDate),
                    photo: VerifyEmpty(dataExtension.photo),
                    cityOfBirth: VerifyEmpty(dataExtension.cityOfBirth),
                    profession: VerifyEmpty(dataExtension.profession),
                    //contractModality: VerifyEmpty(dataExtension.contractModality),
                    //netSalary: VerifyEmpty(dataExtension),
                    //socialSegurityfK: VerifyEmpty(dataExtension),
                    //profesionalRisksfK: VerifyEmpty(dataExtension),
                    //pensionfK: VerifyEmpty(dataExtension),
                    divisionPositionfK: VerifyEmpty(dataExtension.divisionPosition),
                })
                .then(()=>{
                    return fulfill({employee:null, create:false});
                })
                .catch(()=>{
                    return reject(true);
                })
            }
        })
        .catch((err)=>{
            res.serverError("hubo un error al tratar de buscar una extension de usuario empleado")
        })  
    })
}




