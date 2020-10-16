/**
 * EventoExtranoXregistroDiario.js
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
    registroDiarioFk:{
      model:'RegistroDiario'
    },
    tipoResiduoExtranoFk:{
      model:'TipoResiduoExtrano'
    }
  },

};

