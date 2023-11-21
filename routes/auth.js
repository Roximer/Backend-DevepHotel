const {Router}= require("express");
const {check}= require("express-validator");
const{validarCampos}=require("../middlewares/validar-campos");

const {login}= require("../controllers/auth");
const router= Router();

router.post(
  "/login",
[
  check("email" , "El formato de correo no es válido").isEmail(),
  check("email" , "El email es obligatoria").notEmpty(),
  check("password" , "El contraseña es obligatoria").notEmpty(),
  validarCampos 
],
login
);





module.exports= router