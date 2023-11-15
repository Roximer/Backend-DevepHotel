const {Router}= require("express");
const {check}= require("express-validator");
const{validarCampos}=require("../middlewares/validar-campos");
const{esRolValido, correoExiste}= require("../helpers/db-validators");
const { 
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete 
} = require("../controllers/usuarios");

const router= Router();

router.get("/", usuariosGet);
router.post("/",[check("apellidoynombre","El apellido y nombre es obligatorio").notEmpty(),
check("contraseña","La contraseña debe tener mas de 6 caracteres").isLength
({min:6}),
check("correo","El correo no es valido").isEmail(),
check("correo").custom(correoExiste),
check("rol").custom(esRolValido),

validarCampos,
],  
usuarioPost);
router.put("/:id",[check("id","No es id válido"). isMongoId()] ,usuarioPut);
router.delete("/", usuarioDelete);

module.exports=router;

