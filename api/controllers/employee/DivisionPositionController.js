/**
 * DivisionPositionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');
module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("createPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        data=req.body;
        if(data){
            DivisionPosition.create({
                id:uuid.v4(),
                name:data.name,  
                description:data.description
            },function(err, divisionPosition){
                if(!divisionPosition){
                    sails.log(divisionPosition);
                    return res.serverError("algo salio mal es posible que ya se halla registrado el cargo por division");
                }
                else{
                    res.json(divisionPosition);
                }
            },{fetch:true});
        }
    }
};

