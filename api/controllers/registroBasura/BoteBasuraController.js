/**
 * BoteBasuraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');

module.exports = {
    create(req, res){
        //if(!req.permissions.includes("createRegistroDiario")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        const data =req.body;
        sails.log("este es el body bote basura ",req.body);

        BoteBasura.create({
            id:uuid.v4(),
            direccionPosicion:data.direccionPosicion, 
            codigoQr:data.codigoQr,
            area:data.area,
            facultadXsedeFk:data.facultadXsede
        },function(err, boteBasura){
            if(!boteBasura){
                sails.log(boteBasura);
                res.serverError("algo salio mal es posible que ya se halla registrado el permiso");
            }
            else{
                res.json(boteBasura);
            }
        },{fetch:true});
    }

};

