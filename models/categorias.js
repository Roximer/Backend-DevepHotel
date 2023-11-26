const {Schema, model} = require('mongoose')

const CategoriaSchema=Schema({
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
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

});


module.exports = model('Categoria', CategoriaSchema);