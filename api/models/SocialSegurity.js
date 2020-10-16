/**
 * SocialSegurity.js
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
    nit:{ // nit empresa de seguridad social
      type:'string',
      required:true,
      unique:true,
    },
    name:{ // razon social
      type:'string',
      required:true,
    },
    extendUserEmployeeCollection:{ // coleccion de extendsUserEmpleyee
      collection:'extendsUserEmployee',
      via:'socialSegurityfK'  
    }


  },

};

