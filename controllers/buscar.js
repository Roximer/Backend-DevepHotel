const { request, response} = require("express");

//importar ObjectId de mongoose Types
const {ObjectId} = require('mongoose').Types

//importar los modelos de categorias y productos
const Categoria = require("../models/categorias");
const Room = require("../models/habitacion");

//definir colecciones permitidas
const coleccionesPermitidas=['categorias','rooms']

//funcion para buscar por categoria
const buscarCategoria=async(termino, res=response)=>{
    //verificar si lo envian por id
        const isMongoId=ObjectId.isValid(termino)
        if(isMongoId){
            const categoria = await Categoria.findById(termino).populate('usuario','name')
            return res.json({
                results:categoria ? [categoria] : []
            })
        }
    //si la busqueda se hace por el nombre
        const regex = new RegExp(termino, "i")

        const categorias= await Categoria.find({
            nombre:regex,
            estado:true
        }).populate('usuario', 'name')

        res.json({
            results: categorias,
        })
}

//Funcion para buscar habitacion
const buscarRoom = async (termino, res= response)=>{
    const isMongoId=ObjectId.isValid(termino)
    if(isMongoId){
        const room = await Room.findById(termino).populate(
            'usuario',
            'name'
            ).populate('categoria','nombre')
        return res.json({
            results:room ? [room] : []
        })
    }
    
    const regex = new RegExp(termino, "i")

    const Rooms= await Room.find({
        nombre:regex,
        estado:true
    }).populate('usuario', 'name').populate('categoria','nombre')

    res.json({
        results: rooms,
    })
}

//crear funcion busqueda flexible

const buscar = async(req=request, res=response)=>{
    const{coleccion, termino}= req.params
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

switch (coleccion) {
    case 'categorias':
        buscarCategoria(termino, res)
        break;
        case 'rooms':
            buscarRoom(termino,res)
            break;

    default:
        res.status(500).json({
            msg:"Se ha producido algún error en el servidor, intentelo más tardes."
        })
        break;    
}    

}

module.exports = {
    buscar,
}