const{request, response} = require("express");
const Habitacion= require ("../models/habitacion");

const obtenerHabitaciones = async (req = request, res = response) => {
    //const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };
  
    const [total, habitaciones] = await Promise.all([
      Habitacion.countDocuments(query),
      Habitacion.find(query)
        /* .skip(Number(desde))
        .limit(Number(limite))
        //Como traigo los datos de los usuarios y las categorias?🤔
        .populate("categoria", "nombre")
        .populate("usuario", "email"), */
    ]);
  
    res.json({
      total,
      habitaciones
    });
  };
  
 
  const obtenerHabitacion = async (req = request, res = response) => {
    const { id } = req.params;
  
    const habitacion = await Habitacion.findById(id)
      
    res.json({
      habitacion
    });
  };
  
  const habitacionPost = async (req, res) => {
    const { numroom, typeroom, price,photo, available, state } = req.body;
  
    
    //Generar la data a guardar
    const data = {
        numroom,
        typeroom,
        price,
        photo,
        available,
        state,
    };
  
    const habitacion = new Habitacion(data);
  
    //grabar en la base de datos
    await habitacion.save();
  
    res.status(201).json({
      msg: " Habitación creada",
      habitacion,
    });
  };
  
  //actualizar Habitación
  
  const actualizarHabitacion = async (req, res) => {
    const { id } = req.params;
    const { numroom, typeroom, price,photo, available, state } = req.body;
   // const usuario = req.usuario._id;
  
    let data = {
      numroom,
      typeroom,
      price,
      photo,
      available,
      state,
    };
  
    const habitacion = await Habitacion.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({
        message:"Habitación actualizada",
        habitacion
       });  
     };
  
  //Borrar habitación
  const borrarHabitacion = async (req, res) => {
    const { id } = req.params;
  
    const habitacionBorrada = await Habitacion.findByIdAndUpdate( id,
      { state: false },
      { new: true }
    );
  
    res.status(200).json({
      message:"Habitación  eliminada",
      habitacionBorrada,
     });
  };
  
  module.exports = {
    habitacionPost,
    obtenerHabitaciones,
    obtenerHabitacion,
    actualizarHabitacion,
    borrarHabitacion,
  };
