/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    id:{
      type:'string',
      required:true,
      unique:true,
      //encrypt: true
    },
    userName:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      unique:true,
      required:true
    },
    password:{
      type:'string',
      required:true
    },
    confirmPassword:{
      type:'string',
      unique:true,
      required:true
    },
    active:{
      type:'boolean',
      required:true
    },
    admissionDate:{
      type: 'string',
      columnType: 'date',
      allowNull:true,
    },
    permisionXuserCollection:{
      collection:'PermissionXuser',
      via:'userFk'
    },
    extendsUserEmployeeFK:{ // asosiciacion uno a uno en tabla extendsUserEmployee
      model:'extendsUserEmployee'
    },
    programacionDiaUsuarioCollection:{
      collection:'ProgramacionDiaUsuario',
      via:'userFk'
    },
    registroDiarioCollection:{
      collection:'ProgramacionDiaUsuario',
      via:'userFk'
    }
  },
  //aqui ciframos la contraseña antes de crear el usuario
  beforeCreate(values, next){
    bcrypt.genSalt(10, (err, salt)=>{
      if(err){
        sails.log.error(err); 
        return next();
      }
      bcrypt.hash(values.password, salt, (err, hash)=>{
        if(err){
          sail.log.error(err);
          return next();
        }
        values.password=hash;//aqui esta nuestra contraseña cifrada
        return next();
      });

    });
  },
  comparePassword(password, encryptedPassword){
    return new Promise(function(resolve, reject){
        bcrypt.compare(password, encryptedPassword, (err, match)=>{
            if(err){
              sails.log.error(err);
              return reject("algo salió mal!");

            }
            if(match) return resolve();
              else return reject("contraseñas no coincidentes");
            
        });
    });
  },
  /*beforeUpdate: function(data, cb) {
    if(data.password) {
      bcrypt.hash(data.password, sails.config.crypto.workFactor, function(err, hash) {
        data.password = hash;
        delete data.passwordConfirm;
        cb();
      });
    } else {
      return cb();
    }
  }*/

};



