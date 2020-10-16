'use strict'

module.exports=(req, res, next)=>{
    sails.log("entro a police is autorized");
    let token;
    token=req.headers.authorization;
    sails.log(token)

    if(!token){
        return res.status(401).json({err: 'format is Autorization: Bearer[token] o token invalido'});  
    }
    else {
        token=token.replace('Bearer','').trim();
        sails.log("token",token);
    }

    jwToken.verify(token, function(err, token){ 
        if(err) return res.status(401).json({err:'Invalid Token!'});
        req.token=token; //Este es el token descifrado o la carga útil que proporcionó
        sails.log("token decifrado ",req.token);
        next();
    });

}
