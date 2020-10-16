/**
 * ProgramacionDiaUsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var uuid = require('uuid');
module.exports = {
    create(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        if(!req.permissions.includes("createProgramacionDia")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        
        data=req.body;
        sails.log(data);
        if(data){
            ProgramacionDiaUsuario.create({
                id:uuid.v4(),
                dia:data.dia,
                horaIni:data.horaIni,
                horaFin:data.horaFin,
                userFk:data.user,
                facultadXsedeFk:data.facultadXsede,
            }, function(err, programacion) {
               if(!programacion){
                    return res.serverError("no se encontro programacion que mostrar");
               }else{
                    return res.json(programacion);
               }
            },{ fetch: true }); 
        };
    },
    async viewAllOne(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("viewAllPermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        data=req.body;
        sails.log(data.user);
        dataProgramacion={};
        listaProgramacion=[];

        let fechaHoy=new Date();
        sails.log(fechaHoy.toLocaleString());
        var programacion_SQL = `SELECT public."programaciondiausuario"."id", public."programaciondiausuario"."dia", 
        public."programaciondiausuario"."horaIni", public."programaciondiausuario"."horaFin", public."facultadxsede"."descripcion"
        
        FROM public."programaciondiausuario" INNER JOIN public."facultadxsede" on
        public."programaciondiausuario"."facultadXsedeFk" = public."facultadxsede"."id" AND
        public."programaciondiausuario"."id" = public."programaciondiausuario"."id" AND
        public."programaciondiausuario"."dia">='${fechaHoy.toLocaleString()}' AND
        public."programaciondiausuario"."userFk" = '${(data.user)}'`;

        var programacion= await sails.sendNativeQuery(programacion_SQL);
        sails.log("programacion ",programacion);
        for (var i = 0; i < programacion.rows.length; i++) {
          dataProgramacion={
            dia:(programacion.rows[i].dia).toLocaleString(),
            horaIni:programacion.rows[i].horaIni,
            horaFin:programacion.rows[i].horaFin,
            sede:programacion.rows[i].descripcion,
            id:programacion.rows[i].id
          }
          listaProgramacion.push(dataProgramacion);
       }
       sails.log(listaProgramacion);

        res.json(listaProgramacion);

      },
      viewOne(req, res){
      },
      update(req, res){
        //se verifica los permisos la funcion includes retorna true false al comparar un valor con la lista de permission
        //if(!req.permissions.includes("updatePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
      },
      delete(req, res){
        //if(!req.permissions.includes("deletePermission")) return res.status(400).json({err:'No tiene permisos para acceder a este recurso'});
        data=req.body;
        sails.log("eliminar id ", data.id);
        ProgramacionDiaUsuario.destroy({id:data.id})// consulta destruye los permissionXuser que hallan en la tabla por el usuario elegido
          .then((dateProgramacion)=>{
            sails.log("entro a dateprogramacion es decir que elimino ", dateProgramacion);
            return res.json(dataProgramacion);
          },{fetch:true})
          .catch((err)=>{
            return res.serverError("error al eliminar la programacion");
          })    
        }
        
    };
    
