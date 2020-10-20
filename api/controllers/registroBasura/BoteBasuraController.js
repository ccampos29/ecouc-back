/**
 * BoteBasuraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');

module.exports = {
    create(req, res) {
        //if(!req.permissions.includes("createRegistroDiario")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        const data = req.body;
        sails.log("este es el body bote basura ", req.body);

        BoteBasura.create({
            id: uuid.v4(),
            direccionPosicion: data.direccionPosicion,
            codigoQr: data.codigoQr,
            area: data.area,
            facultadXsedeFk: data.facultadXsede
        }, function (err, boteBasura) {
            if (!boteBasura) {
                sails.log(boteBasura);
                res.serverError("algo salio mal es posible que ya se halla registrado el permiso");
            }
            else {
                res.json(boteBasura);
            }
        }, { fetch: true });
    },
    viewOne(req, res) {
        const data = req.body;
        BoteBasura.findOne({ codigoQr: req.body.codigoQr })
            .then((response) => {
                if (response) {
                    res.json({dump: response});
                } else {
                    res.serverError("no se encontraron registros con el codigoQr");
                }
            }).catch((error) => {
                res.serverError("hubo un error al tratar de recuperer datos del bote de basura");
            })


    },
    viewAll(req, res) {
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});

        BoteBasura.find()
            .then((trashs) => {
                res.json({ dumps: trashs });
            })
            .catch((err) => {
                res.serverError("no se encontro datos que mostrar ", err);
            })
    },

};

