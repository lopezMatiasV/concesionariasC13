let express = require('express');
const { buscarSucursal } = require('../controllers/adminSucursalesController');
let router = express.Router();

let { users, userEdit, userDelete, userSearch } = require('../controllers/adminUsersController')

router
    .get('/', users)
    .put('/:id', userEdit)
    .delete('/:id', userDelete)
    .get('/search', userSearch)

module.exports = router;