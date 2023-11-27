const { response, request } = require("express");
const Room = require("../models/habitacion");

//Get para traer todos los rooms paginados--------------------
const obtenerRooms = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, rooms] = await Promise.all([
    Room.countDocuments(query),
    Room.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      //Como traigo los datos de los usuarios y las categorias?🤔
      .populate("categoria", "nombre")
      .populate("usuario", "email"),
  ]);

  res.json({
    total,
    rooms,
  });
};

//--------------------------------------------------------------
//obtener un room por su ID
const obtenerRoom = async (req = request, res = response) => {
  const { id } = req.params;

  const room = await Room.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.json({
    room,
  });
};

const roomPost = async (req, res) => {
  const { precio, categoria, descripcion, img, stock } = req.body;

  const nombre = req.body.nombre.toUpperCase();

  const roomDB = await Room.findOne({ nombre });

  if (roomDB) {
    return res.status(400).json({
      msg: `El room ${roomDB.nombre} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    stock,
    usuario: req.usuario._id,
  };

  const room = new Room(data);

  //grabar en la base de datos
  await room.save();

  res.status(201).json({
    msg: "Se agregó room",
  });
};

//actualizarRoom (validar nombre)-----------------------------------------

const actualizarRoom = async (req, res) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, disponible, estado } = req.body;
  const usuario = req.usuario._id;

  let data = {
    precio,
    descripcion,
    categoria,
    disponible,
    usuario,
    estado,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  if (req.body.stock) {
    data.stock = req.body.stock;
  }
  if (req.body.img) {
    data.img = req.body.img;
  }

  const room = await Room.findByIdAndUpdate(id, data, { new: true })
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.status(200).json(room);
};

//Borrar room-----------------------------------------------------
const borrarRoom = async (req, res) => {
  const { id } = req.params;

  const roomBorrado = await Room.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    roomBorrado,
  });
};

module.exports = {
  roomPost,
  obtenerRooms,
  obtenerRoom,
  actualizarRoom,
  borrarRoom,
};