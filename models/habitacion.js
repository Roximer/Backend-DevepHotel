const {Schema, model} = require('mongoose')

const RoomSchema=Schema({
  numero: {
    type: String,
    required:[true,'el numero de habitacion es obligatorio'],
    unique:true,
  },
  tipo: {
    type:String,
    enum:["SIMPLE","DOBLE","BUNGALOW_FAMILIAR"],
  },
  precio: {
    type: Number,
    required:[true],
  },
  disponibilidad: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectID,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectID,
    ref: "Categoria",
    required: true,
  },
  foto: {
    type: String,
    required: [true],
  },
  stock: {
    number: Number,
  },
});

RoomSchema.methods.toJSON = function () {
  const { __v, _id, ...room } = this.toObject();
  room.rid = _id;
  return room;
};

module.exports = model('Room', RoomSchema);