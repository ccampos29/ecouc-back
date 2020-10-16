/**
 * BoteBasura.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:'string',
      required:true,
      unique:true,
    },
    direccionPosicion:{
      type:'string',  
      allowNull:true
    },
    codigoQr:{
      type:'string',  
      allowNull:true
    },
    area:{
      type:'string',  
      allowNull:true
    },
    facultadXsedeFk:{ // coleccion de extendsUserEmpleyee
      model:'FacultadXsede' 
    },
    registroDiarioCollection:{
      collection:'RegistroDiario',
      via:'boteBasuraFk'
    }
  },

};

