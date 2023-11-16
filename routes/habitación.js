const {Router}= require("express");
const {check}= require("express-validator");
//const{validarCampos}=require("../middlewares/validar-campos");
//const{esRoleValido, emailExiste}= require("../helpers/db-validators");
const { 
    habitacionesGet,
    habitacionPost,
    habitacionPut,
    habitacionDelete 
} = require("../controllers/habitación");

const router= Router();

  router.get("/", habitacionesGet);
  router.post("/",[check("numero","El numero de habitación es obligatorio").notEmpty(),
  check("piso","El número de piso es obligatorio").notEmpty(),
  check("precio","El precio es oblidatorio").notEmpty(),
  check("tipohab","No es un tipo de habitación válida").isIn([ "ADMIN_ROLE","USER_ROLE"]),
  //check("email").custom(emailExiste),
  //check("role").custom(esRoleValido),

  validarCampos,
],  
 habitacionPost);
  router.put("/:id",[check("id","No es id válido"). isMongoId()] ,habitacionPut);
  router.delete("/", habitacionDelete);

    module.exports=router;
