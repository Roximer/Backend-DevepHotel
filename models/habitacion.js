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
  foto: {
    type: String,
    required: [true],
  },

});

RoomSchema.methods.toJSON = function () {
  const { __v, _id, ...room } = this.toObject();
  room.rid = _id;
  return room;
};

module.exports = model('Room', RoomSchema);