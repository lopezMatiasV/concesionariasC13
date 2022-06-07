let express = require('express');
let router = express.Router();

let { listar, auto} = require('../controllers/autosController')

router.get('/', listar);
router.get('/detalle/:id', auto);

module.exports = router;