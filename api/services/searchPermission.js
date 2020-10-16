'use strict';

//esta clase es la que busca cuales son los permisos del usuario y retorna la lista de dichos permisos

module.exports={

    
    search(payload, callback){
        sails.log("entro a services is permision");
       
        let user=payload;//id del usuario registrado
        let listPermissions=[];

        PermissionXuser.find({where:{userFk:user}}).populate('permissionFk')
        .then((permission)=>{

            if(permission.length>0){

                permission.forEach(element => {
                    listPermissions.push(element.permissionFk.name);
                });

                return callback(listPermissions);

            }else{
                return callback(false);
            }
        })
        .catch((err)=>{
            return callback('err'); 
         });  
        
    }
}