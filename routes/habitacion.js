const {Router} = require('express');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { roomExiste, existeRoomPorId } = require("../helpers/db-validators")
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole, tieneRol } = require('../middlewares/validar-role')
const {
    roomPost,
    obtenerRooms,
    obtenerRoom,
    actualizarRoom,
    borrarRoom,
} = require ('../controllers/habitacion')

const router = Router()

    router.get('/', obtenerRooms)
    
    //listar habitaciones por id
    router.get(
        '/:id',
        [
            check("id", "El id no es válido").isMongoId(),
            validarCampos,
        ],
        obtenerRoom
    ) 
    
    router.post('/',
    [
        validarJWT,
        esAdminRole,
        check("number","El numero de habitación es obligatorio").notEmpty(), 
        check("number").custom(roomExiste),
        check("type","El tipo de habitación es obligatorio").notEmpty(), 
        check("price" ,"El precio por noche es obligatorio").notEmpty(), 
        validarCampos,
        ],
        roomPost
 ) 

    router.put('/:id', 
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeRoomPorId), 
        validarCampos,
    ], actualizarRoom) 
    
    router.delete('/:id', 
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeRoomPorId), 
        validarCampos,
    ],borrarRoom) 

    
module.exports = router