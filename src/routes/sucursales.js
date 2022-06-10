let express = require('express');
let router = express.Router();

let controller = require('../controllers/sucursalesController')

/* GET Sucursal */
router.get('/', controller.sucursales)
router.get('/:id', controller.sucursal)

module.exports = router;