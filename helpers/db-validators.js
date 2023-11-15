//const Role = require ("../models/role");
const Usuario= require ("../models/usuario");

const esRolValido= async(rol="USER_ROLE")=>{
    const existeRol =await Rol.findOne({rol});
    if(!existeRol){
      throw new Error (`El rol ${rol} no esta registrado en la BD`);
      }
    }

    // validar si el email existe
   const correoExiste= async(correo)=>{
    const existeCorreo= await Usuario.findOne({email})
    if (existeCorreo){
      throw new Error (`El correo ${correo} ya esta registrado en la BD`); 
}
}
   const existeUsuarioPorId= async(id)=>{
    const existeUsuarioPorId= await Usuario.findById(id)
    if (existeCorreo){
      throw new Error (`El correo ${correo} ya esta registrado en la BD`); 
   }
} 
    module.exports={
        esRolValido, 
        correoExiste, 
    }
