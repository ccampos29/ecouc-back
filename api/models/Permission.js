/**
 * Permission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:'string',
      required: true,
      unique:true,
    },
    name:{
      type:'string',
      unique:true,
      required:true,
    },
    description:{
      type:'string',
      allowNull:true,
    },
    admissionDate:{
      type: 'string',
      columnType: 'date',
      allowNull:true,
    },
    permissionXuserCollection:{
      collection:'PermissionXuser',
      via:'permissionFk'
    }
  }
};

