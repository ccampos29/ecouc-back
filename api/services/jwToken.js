'use strict';

const jwt = require('jsonwebtoken'), tokenSecret="secretissecret";

module.exports={
    //generar un token apartir de una carga util suministrada
    issue(payload){
        return jwt.sign(
            payload, 
            tokenSecret,//token secreto con el que lo firmamos
            {
                expiresIn:"30 days"//tiempo de expiracion del token
            }
        );
    }, 
    verify(token, callback){
        sails.log("entro a services is verify");

        return jwt.verify(
            token,//el token a verificar
            tokenSecret,//el mismo token que soliamos firmar
            {},
            callback //Pase errores o token decodificado a devolución de llamada
        );
    },
};