/**
 * TipoResiduoExtrano.js
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
    nombre:{
      type:'string',  
      allowNull:true
    },
    categorizacion:{
      type:'string',  
      allowNull:true
    },
    descripcion:{
      type:'string',  
      allowNull:true
    },
    eventoExtranoXregistroDiarioCollection:{
      collection:'EventoExtranoXregistroDiario',
      via:'tipoResiduoExtranoFk'
    }

  },

};

