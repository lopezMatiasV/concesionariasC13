let express = require('express');
let router = express.Router();
let {
    autos,
    formAgregarAuto,
    agregarAuto,
    editFormAuto,
    editAuto,
    borrarAuto,
    buscarAuto,
} = require('../controllers/adminAutosController');

/* middewares */
const upload = require('../middlewares/uploadFiles')

/* validaciones */
const autoValidator = require('../validations/autoValidator')

/*ADMINISTRACION DE AUTOS*/
router
    .get('/', autos)
    .get('/agregarAuto', formAgregarAuto)
    .post('/agregarAuto', upload.single('image'), autoValidator, agregarAuto)
    .get('/editarAuto/:id', editFormAuto)
    .put('/editarAuto/:id', upload.single('image'), autoValidator, editAuto)
    .delete('/eliminarAuto/:id', borrarAuto)
    .get('/search', buscarAuto);

module.exports = router;