const{request, response} = require("express");
const Usuario= require ("../models/usuario");
const bcrypt = require('bcryptjs');

//funciones

const usuariosGet= (req=request, res=response)=> {
    const {limit,page}=req.query;
    res.json({
     message:"GET usuarios- Controllers",
     limit,
     page,
    });
   }

const usuarioPost= async(req=request, res)=> {
    
    const {apellidoynombre,dni,correo,contrasenia,rol}=req.body;
    const usuario= new Usuario({ apellidoynombre,dni,correo,contrasenia,rol});

    // validar si el email existe
   
    const salt = bcrypt.genSaltSync();
    usuario.contrasenia=bcrypt.hashSync(contrasenia,salt);

    await usuario.save();

    res.status(201).json({
     message:"Usuario creado",
     usuario, //toJSON
    });
  }

const usuarioPut= async (req=request, res)=> {
    const{id}=req.params;
    const{contrasenia,_id,dni, correo,...resto}=req.body;

    const salt = bcrypt.genSaltSync();
    resto.password=bcrypt.hashSync(password,salt);
    const usuario=await Usuario.findByIdAndUpdate(id,resto,{new:true});

    res.status(200).json({
     message:"Usuario actualizado",
     usuario,
    });
    
  }

const usuarioDelete= (req, res)=> {
    
    res.json({
     message:"DELETE usuarios- Controllers",
    });
   }

module.exports={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
   }


