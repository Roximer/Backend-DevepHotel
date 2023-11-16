const{request, response} = require("express");
const Usuario= require ("../models/habitación");


const habitacionesGet= (req=request, res=response)=> {
    const {limit,page}=req.query;
    res.json({
     message:"GET usuarios- Controllers",
     limit,
     page,
    });
   }

const habitaciónPost= async(req=request, res)=> {
    
    const {piso,numero,precio}=req.body;
    const usuario= new Usuario({ piso,numero,fotohab, precio,tipohab});

   
    await habitación.save();

    res.status(201).json({
     message:"Usuario creado",
     usuario, //toJSON
    });
   }

const habitaciónPut= async (req=request, res)=> {
    const{id}=req.params;
    const{numero,_id, email,...resto}=req.body;


    const habitación=await Habitación.findByIdAndUpdate(id,resto,{new:true});

    res.status(200).json({
     message:"habitación actualizada",
     habitación,
    });
    

   }

const habitaciónDelete= (req, res)=> {
    
    res.json({
     message:"DELETE usuarios- Controllers",
    });
   }

   module.exports={
    habitacionesGet,
    habitaciónPost,
    habitaciónPut,
    habitaciónDelete
   }
