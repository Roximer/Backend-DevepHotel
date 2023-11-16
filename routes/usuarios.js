const {Router}= require("express");
const {check}= require("express-validator");
const{validarCampos}=require("../middlewares/validar-campos");
//const{esRoleValido, emailExiste}= require("../helpers/db-validators");
const { 
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete 
} = require("../controllers/usuario");

const router= Router();

  router.get("/", usuariosGet);
  router.post("/",[check("name","El nombre es obligatorio").notEmpty(),
  check("dni","El dni es obligatorio").notEmpty(),
  check("password","La contraseña debe tener mas de 6 caracteres").isLength
  ({min:6}),
  check("email","El mail no es valido").isEmail(),
  check("role","No es un rol válido").isIn([ "ADMIN_ROLE","USER_ROLE"]),
  //check("email").custom(emailExiste),
  //check("role").custom(esRoleValido),

  validarCampos,
],  
 usuarioPost);
  router.put("/:id",[check("id","No es id válido"). isMongoId()] ,usuarioPut);
  router.delete("/", usuarioDelete);

    module.exports=router;


