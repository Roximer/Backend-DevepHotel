const { request, response } = require('express');
const Room = require('../models/habitacion'); 

const roomsGet = async(req = request, res = response) => {
  const { limite=5, desde=0 } = req.query;

  //promise.all()agrupar promesas

  const [total, room] = await Promise.all([
    Room.countDocuments({availability:true}),
    Room.find({availability:true}).limit(limite).skip(desde)  
  ])

  res.status(200).json({
    total,
    room
  });
};


const roomsPost = async (req = request, res = response) => {
    const tipos= ["SIMPLE","DOBLE","BUNGALOW_FAMILIAR"]
  
    const { numero, tipo, precio, disponibilidad, foto } = req.body;
  
    if(!tipos.includes(tipo.toUpperCase())){
      return res.status(401).json({
        msg:`El tipo de habitación no pertenece a ${tipos}`
      })
    }
    const tipoFinal=tipo.toUpperCase()
    const room = new Room({ number,tipo:tipoFinal, price, availability, photo }); 
    
    await room.save()
  
    res.status(201).json({
        message: "Habitacion creado",
        room,
    });
  }
const roomsPut = async (req = request, res = response) => {
  const { id } = req.params;

  const{_id, precio, foto,...resto} = req.body

  await Room.findByIdAndUpdate(id, resto)

  res.status(200).json({
    message: 'datos habitación actualizados',
    resto,
  });

};

const roomsDelete = async(req = request, res = response) => {
const{id}= req.params

//borrado fisico.
//const roomBorrada = await Room.findByIdAndDelete(id)

//inactivar un documento.
await Room.findByIdAndUpdate(
  id, {disponibilidad:false,}, {new:true})
  
res.status(200).json({
    message: 'Rooms eliminada',
  });
};

module.exports = {
  roomsGet,
  roomsPost,
  roomsPut,
  roomsDelete,
};