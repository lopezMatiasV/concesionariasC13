let express = require('express');
let router = express.Router();
let {sucursales, 
    formAgregarSucursal, 
    agregarSucursal, 
    index,
    editForm,
    editarSucursal,
    borrarSucursal,
    autos,
    formAgregarAuto,
    agregarAuto,
    editFormAuto,
    editAuto,
    borrarAuto,
} = require('../controllers/adminController');

/* Index del admin */
router.get('/', index)

/* Mostrar todas las sucursales */
router.get('/sucursales', sucursales)

/* Formulario para Agregar sucursal */
router.get('/agregarSucursal', formAgregarSucursal);

/* Envia y guarda los datos para Agregar sucursal */
router.post('/agregarSucursal', agregarSucursal);

/* Formulario de edicion */
router.get('/editarSucursal/:id',editForm);
/* PUT - Recibe los datos de edicion */
router.put('/editarSucursal/:id', editarSucursal);

/* DELETE - Borra una sucursal */
router.delete('/eliminarSucursal/:id', borrarSucursal)

/*ADMINISTRACION DE AUTOS*/
router.get('/autos', autos);
router.get('/agregarAuto', formAgregarAuto);
router.post('/agregarAuto', agregarAuto);
router.get('/editarAuto/:id', editFormAuto);
router.put('/editarAuto/:id', editAuto);
router.delete('/eliminarAuto/:id', borrarAuto)

module.exports = router;