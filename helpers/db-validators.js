
const Usuario= require ("../models/usuario");

  const esRoleValido= async(role)=>{
    const existeRole =await Usuario.findOne({role});
    if(!existeRole){
      throw new Error (`El rol ${role} no esta registrado en la BD`);
      }
    } 
 
    
   const emailExiste= async(email)=>{
    const existeEmail= await Usuario.findOne({email})
    if (existeEmail){
      throw new Error (`El correo ${email} ya esta registrado en la BD`); 
}
}
   const existeUsuarioPorId= async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
      throw new Error (`El id ${id} no existe `); 
   }
   } 
    module.exports={
        esRoleValido, 
        emailExiste, 
        existeUsuarioPorId
    }
  