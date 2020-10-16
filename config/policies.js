/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
//UserController=require('../api/controllers/authentication/UserController')

module.exports.policies = {
  '*':['isAuthorized','verifyPermission'], //Todo restringido aquí

  'authentication/UserController':{//nombre del controlador
    'login':true,//No necesitamos autorización aquí, lo que permite el acceso público  
  },
  'registroBasura/BoteBasuraController':{
    'create':true,
  },
  'registroBasura/RegistroDiarioController':{
    'viewAll':true,
    'viewOne':true
  },
  'registroBasura/TipoResiduoExtranoController':{
    'create':true,
    'viewAll':true
  },
  'employee/ProgramacionDiaUsuarioController':{
    //'create':true
    'viewAllOne':true,
    'delete':true
  },
  'registroBasura/FacultadXsedeController':{
    'viewAll':true,
    'create':true
  },
  'registroBasura/SedeController':{
    'create':true,
    'viewAll':true
  },
  
};
