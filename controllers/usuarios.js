const{request, response} = require("express");
const Usuario= require ("../models/usuario");
const bcrypt = require('bcryptjs');



const usuariosGet= (req=request, res=response)=> {
    const {limit,page}=req.query;
    res.json({
     message:"GET usuarios- Controllers",
     limit,
     page,
    });
   }

const usuarioPost= async(req=request, res)=> {
    
    const {name,email,dni,password,role}=req.body;
    const usuario= new Usuario({ name, email,dni, password,role});

   
    const salt = bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);
    

    await usuario.save();

    res.status(201).json({
     message:"Usuario creado",
     usuario, //toJSON
    });
   };

const usuarioPut= async (req=request, res)=> {
    const{id}=req.params;
    const{password,_id, email, ...resto}=req.body;

    const salt = bcrypt.genSaltSync();
    resto.password=bcrypt.hashSync(password,salt);

    const usuario=await Usuario.findByIdAndUpdate(id,resto, {new:true});

    res.status(200).json({
     message:"Usuario actualizado",
     usuario,
    });
    };

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



