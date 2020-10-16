/**
 * DivisionCompany.js
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
    name:{ // nombre de division
      type:'string',
      required:true,
    },
    description:{ // descripcion de la division 
      type:'string',
      allowNull:true
    },
    divisionPositionCollection:{ // colleccion de cargos por division  divisionPosition
      collection:'divisionPosition',
      via:'divisionCompanyFk'
    }

  },

};

