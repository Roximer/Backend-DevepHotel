//const Role = require ("../models/role");
const Usuario= require ("../models/usuario");

const esRoleValido= async(role="USER_ROLE")=>{
    const existeRole =await Role.findOne({role});
    if(!existeRole){
      throw new Error (`El rol ${role} no esta registrado en la BD`);
      }
    }

    // validar si el email existe
   const emailExiste= async(email)=>{
    const existeEmail= await Usuario.findOne({email})
    if (existeEmail){
      throw new Error (`El correo ${email} ya esta registrado en la BD`); 
}
}
   const existeUsuarioPorId= async(id)=>{
    const existeUsuarioPorId= await Usuario.findById(id)
    if (existeEmail){
      throw new Error (`El correo ${email} ya esta registrado en la BD`); 
   }

    module.exports={
        esRoleValido, 
        emailExiste, 
    }
  }