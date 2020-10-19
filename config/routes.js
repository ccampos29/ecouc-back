/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //UserController
  'POST /User/login' : 'authentication/UserController.login',
  'POST /User/create': 'authentication/UserController.create',
  'GET /User/viewAll':'authentication/UserController.viewAll',
  'GET /User/getUsers':'authentication/UserController.getUsers',
  'GET /User/viewPermissionAndPosition':'authentication/UserController.viewPermissionAndPosition',
  //'POST /User/viewOne':'authentication/UserController.viewOne',
  'POST /User/deactivate':'authentication/UserController.deactivate',
  //'POST /User/update':'authentication/UserController.update',
  //PermissionController
  'POST /Permission/create': 'authentication/PermissionController.create',
  'GET /Permission/viewAll': 'authentication/PermissionController.viewAll',
  'POST /Permission/viewOne': 'authentication/PermissionController.viewOne',
  //PermissionXuserController
  'POST /PermissionXuser/create':'authentication/PermissionXuserController.create',
  'GET /PermissionXuser/viewAll':'authentication/PermissionXuserController.viewAll',
  'POST /PermissionXuser/viewOne':'authentication/PermissionXuserController.viewOne',
  //ExtendsUserEmployeeController
  'POST /ExtendsUserEmployee/create':'employee/ExtendsUserEmployeeController.create',
  'POST /ExtendsUserEmployee/viewOne':'employee/ExtendsUserEmployeeController.viewOne',  
  'POST /ExtendsUserEmployee/update':'employee/ExtendsUserEmployeeController.update',  
  //DivisionPositionController
  'POST /DivisionPosition/create':'employee/DivisionPositionController.create',
  //BoteBasuraController
  'POST /BoteBasura/create': 'registroBasura/BoteBasuraController.create',
  'GET /BoteBasura/viewAll': 'registroBasura/BoteBasuraController.viewAll',
  //RegistroDiarioController
  'POST /RegistroDiario/create': 'registroBasura/RegistroDiarioController.create',
  'GET /RegistroDiario/viewAll': 'registroBasura/RegistroDiarioController.viewAll',
  'POST /RegistroDiario/viewOne':'registroBasura/RegistroDiarioController.viewOne',
  //TipoResiduoExtranoController
  'GET /TipoResiduoExtrano/viewAll': 'registroBasura/TipoResiduoExtranoController.viewAll',
  'POST /TipoResiduoExtrano/create': 'registroBasura/TipoResiduoExtranoController.create',
  //ProgramacionDiaUsuarioController
  'POST /Programacion/create':'employee/ProgramacionDiaUsuarioController.create',
  'POST /Programacion/viewAllOne':'employee/ProgramacionDiaUsuarioController.viewAllOne',
  'POST /Programacion/delete':'employee/ProgramacionDiaUsuarioController.delete',
  //FacultadXsedeController
  'GET /FacultadXsede/viewAll':'registroBasura/FacultadXsedeController.viewAll',
  'POST /FacultadXsede/create':'registroBasura/FacultadXsedeController.create',
  //SedeController
  'GET /Sede/viewAll':'registroBasura/SedeController.viewAll',
  'POST /Sede/create':'registroBasura/SedeController.create',
  //Chat
  'POST /Chat/sendMessage':'message/MessageController.sendMessage',
  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
