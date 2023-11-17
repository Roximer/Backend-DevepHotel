const {Router}= require("express");
const {check}= require("express-validator");
const{validarCampos}=require("../middlewares/validar-campos");

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
  check("tipohab","No es un tipo de habitación válida").isIn([ "SINGLE","DOBLE","TRIPLE"]),
  

  validarCampos,
],  
 habitacionPost);
  router.put("/:id",[check("id","No es id válido"). isMongoId()] ,habitacionPut);
  router.delete("/", habitacionDelete);

    module.exports=router;
