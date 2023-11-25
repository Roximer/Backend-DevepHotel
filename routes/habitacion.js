const {Router} = require('express');
const {check} = require('express-validator')
const { roomsGet, roomsPost, roomsPut, roomsDelete } = require('../controllers/habitacion');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeRoom, existeRoomPorId } = require("../helpers/db-validators")

const router = Router()

    router.get('/', [

    ],roomsGet) 
    
    router.post('/',
    [
        check("number","El numero de habitación es obligatorio").notEmpty(), 
        check("number").custom(existeRoom),
        check("type","El tipo de habitación es obligatorio").notEmpty(), 
        check("price" ,"El precio por noche es obligatorio").notEmpty(), 
        validarCampos,
        ],
        roomsPost
 ) 

    router.put('/:id', 
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeRoomPorId), 
        validarCampos,
    ], roomsPut) 
    
    router.delete('/:id', 
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeRoomPorId), 
        validarCampos,
    ],roomsDelete) 

    
module.exports = router