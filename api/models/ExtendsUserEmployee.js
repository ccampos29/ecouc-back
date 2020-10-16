/**
 * ExtendsUserEmployee.js
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
    documentNumber:{ // numero de documento
      type: 'ref',
      columnType: 'int8',
      //required:true,
      //unique:true,
    },
    name:{ // nombre
      type:'string',
      //required:true,
      allowNull:true
    },
    lastName:{ // apellido
      type:'string',
      //required:true,
      allowNull:true
    },
    sex:{ // sexo
      type:'string',
      //required:true,
      allowNull:true
    },
    birthYear:{//año nacimiento
      type: 'string',
      //columnType: 'date',
      //required:true,
      allowNull:true
    },
    address:{ // direccion
      type:'string',
      allowNull:true
    },
    phoneNumber:{ // numero de telefono
      type: 'ref',
      columnType: 'int8',
      //allowNull:true
    },
    celphoneNumber:{//numero de celular
      type: 'ref',
      columnType: 'int8',
      //required:true
    },
    hiringDate:{//fecha de contratacion
      type: 'string',
      //columnType: 'date',
      allowNull:true,
    },
    photo:{ // foto
      type:'string',
      allowNull:true
    },
    cityOfBirth:{ // ciudad de nacimiento declarar en frontend
      type:'string',
      allowNull:true
    },
    neighborhood:{ // barrio
      type:'string',
      allowNull:true
    },
    profession:{ // profesion se debe declarar en frontend
      type:'string',
      //required:true
      allowNull:true
    },
    contractModality:{ // modalidad de contrato se debe declarar en frontend
      type:'string',
      allowNull:true
    },
    netSalary:{ //salario sin bruto
      type: 'ref',
      columnType: 'int8',
      //allowNull:true
    },
    userFk:{ // asosiciacion uno a uno en tabla user
      model:'user'
    },
    socialSegurityfK:{ // seguridad social foranea en tabla socialSegurity
      model:'socialSegurity'
    },
    profesionalRisksfK:{ // riesgos profesionales foranea en tabla profesionalRisks
      model:'profesionalRisks'
    },
    pensionfK:{ // pension foranea en tabla pension
      model:'pension'
    },
    divisionPositionfK:{ // cargo en division foranea en tabla divisionPosition
      model:'divisionPosition'
    },
  }
};

