

module.exports = (req, res, next)=>{
    sails.log("entro a police is permision");

    let userPayload;
    
    userPayload=req.token;//es el token decifrado que contiene el id de usuario en la variable req.token creada cuando se verifica el isAuthorized
    
   if(userPayload==undefined){
       return res.send("hubo un error en el token!");
   }
   else{
    searchPermission.search(userPayload.id, function(response){
        sails.log(response)
        if(!response){
            return res.serverError('No tiene permisos para acceder a ningun recurso ');
        }
        else if(response=='err'){
            return res.serverError('hubooo un error');
        }
        else{
            req.permissions=response;//creo una nueva variable llamada permissions en req y le envio response que es la lista de permisos
            next();
        }
        });  
    }
};


