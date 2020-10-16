/**
 * DivisionPosition.js
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
    name:{ // nombre de cargo por division
      type:'string',
      required:true,
    },
    description:{ // descripcion del cargo por division
      type:'string',
      allowNull:true
    },
    extendUserEmployeeCollection:{ // coleccion de extendsUserEmpleyee
      collection:'extendsUserEmployee',
      via:'divisionPositionfK'
    },
    divisionCompanyFk:{ // foranea en tabla divisionCompany
      model:'divisionCompany'
    }
  },

};

