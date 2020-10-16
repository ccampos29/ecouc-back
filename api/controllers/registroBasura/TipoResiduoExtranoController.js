/**
 * TipoResiduoExtranoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var uuid = require('uuid');

module.exports = {
  
    create(req, res){
        //if(!req.permissions.include("createTipoRegistroExtraño")) return res.status(400).json({err:"no tiene permisos para acceder a este recurso"});
        data=req.body;
        sails.log("esto des data en tipo residuo ",data);
        TipoResiduoExtrano.create({
            id:uuid.v4(),
            nombre:data.nombre,
            categorizacion:data.categorizacion,
            descripcion:data.descripcion

        },function(err, tipoResiduo){
            if(!tipoResiduo){
                res.serverError("hubo un error al crear el tipo de residuo",err);
            }
            else{
                res.json(tipoResiduo);
            }
        },{fetch:true});
    },
    viewAll(req, res){
        //if(!req.permissions.includes("viewAllTipoRegistroExtraño")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
    
        TipoResiduoExtrano.find()
        .then(
            (data)=>{
                if(data){
                    res.json(data);
                }
                else{
                    res.serverError("No se pudo obtener datos"); 
                }
            }
        )
        .catch(
            (err)=>{
                res.serverError("hubo un error al tratar de obtener los datos ");
            }
        )
    }

};

