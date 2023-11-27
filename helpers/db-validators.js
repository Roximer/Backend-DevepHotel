const Role = require ('../models/role');
const Usuario= require ("../models/usuario");
const Room = require ("../models/habitacion");
const Categoria = require ('../models/categorias')

  const esRoleValido= async(role="USER_ROLE")=>{
    const existeRole =await Usuario.findOne({role});
    if(!existeRole){
      throw new Error (`El rol ${role} no esta registrado en la BD`);
      }
    } 
 
    //Validar si el mail existe
   const emailExiste= async(email)=>{
    const existeEmail= await Usuario.findOne({email})
    if (existeEmail){
      throw new Error (`El correo ${email} ya esta registrado en la BD`); 
}
}
   const existeUsuarioPorId= async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
      throw new Error (`El id ${id} NO existe `); 
    }
      //si el usuario existe cerifico su estado
    if (!existeUsuario.state) {
      throw new Error (`El usuario ${existeUsuario.name} está inactivo`);  
    }
   }; 

   //validar categoria por id
   const categoriaExiste = async (id) =>{
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria){
      throw new Error (`El id ${id} no existe en la bd`)
    }
    if(!existeCategoria.estado){
      throw new Error (`La categoría ${existeCategoria.nombre} está inactiva`)
    }
   }

     //validar si numero habitación ya existe
  const roomExiste = async (numero)=>{
    const existeRoom = await Room.findOne({numero})
    if (existeRoom){
      throw new Error(`La habitación ${numero} ya existe en la BD.`)
    }
  }

  //validar si habitación ya existe
  const existeRoomPorId = async (id)=>{
    const existeRoom = await Room.findById(id)
    if (!existeRoom
      ){
      throw new Error(`El id No existe en la BD.`)
    }
  }
   
    module.exports={
        esRoleValido, 
        emailExiste, 
        existeUsuarioPorId,
        roomExiste,
        existeRoomPorId,
        categoriaExiste,
    }
  