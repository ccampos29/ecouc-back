/**
 * ProgramacionDiaUsuario.js
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
    dia:{ // nit empresa de pension
      type:'ref',
      columnType:'date'
    },
    horaIni:{ // razon social
      type:'ref',
      columnType:'time',
    },
    horaFin:{ // razon social
      type:'ref',
      columnType:'time',
    },
    userFk:{ // coleccion de extendsUserEmpleyee
      model:'User' 
    },
    facultadXsedeFk:{ // coleccion de extendsUserEmpleyee
      model:'FacultadXsede' 
    }
  },

};

