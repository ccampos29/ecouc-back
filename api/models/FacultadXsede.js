/**
 * FacultadXsede.js
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
    descripcion:{
      type:'string',  
      allowNull:true
    },
    sedeFk:{ // coleccion de extendsUserEmpleyee
      model:'Sede' 
    },
    programacionDiaUsuarioCollection:{
      collection:'ProgramacionDiaUsuario',
      via:'facultadXsedeFk'
    },
    boteBasuraCollection:{
      collection:'BoteBasura',
      via:'facultadXsedeFk'
    }
  },  

};

