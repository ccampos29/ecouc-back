/**
 * RegistroDiario.js
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
    diaRecoleccion:{ // nit empresa de pension
      type:'ref',
      columnType:'date'
    },
    horaRecoleccion:{ // razon social
      type:'ref',
      columnType:'time',
    },
    descripcion:{
      type:'string',  
      allowNull:true
    },
    estadoBoteBasura:{
      type:'integer',
      allowNull:true
    },
    userFk:{
      model:'User'
    },
    boteBasuraFk:{
      model:'BoteBasura'
    },
    eventoXregistroDiarioCollection:{
      collection:'EventoExtranoXregistroDiario',
      via:'registroDiarioFk'
    }
  },

};

