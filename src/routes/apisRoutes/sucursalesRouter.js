const express = require('express');
const router = express.Router();
const { all, one, add, edit, destroy } = require('../../controllers/apis/apiSucursalesController')

router
    .get('/', all)
    .get('/:id', one)
    .post('/', add)
    .put('/:id', edit)
    .delete('/:id', destroy);

module.exports = router