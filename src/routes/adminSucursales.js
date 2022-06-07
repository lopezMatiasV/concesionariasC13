let express = require('express');
let router = express.Router();
let {
    sucursales, 
    formAgregarSucursal, 
    agregarSucursal,
    editForm,
    editarSucursal,
    borrarSucursal,
    buscarSucursal,
} = require('../controllers/adminSucursalesController');

/* middewares */
const upload = require('../middlewares/uploadFiles')

/* validaciones */
const sucursalValidator = require('../validations/sucursalValidator')

/* Index del admin */
router
    .get('/', sucursales)
    .get('/agregarSucursal', formAgregarSucursal)
    .post('/agregarSucursal', upload.single('image'), sucursalValidator, agregarSucursal)
    .get('/editarSucursal/:id',editForm)
    .put('/editarSucursal/:id', upload.single('image'), sucursalValidator, editarSucursal)
    .delete('/eliminarSucursal/:id', borrarSucursal)
    .get('/search', buscarSucursal);

module.exports = router;