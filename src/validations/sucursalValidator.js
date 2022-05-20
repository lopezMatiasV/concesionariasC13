const { check } = require('express-validator');
module.exports = [
    check('nombre')
        .notEmpty().withMessage('Tienes que otorgarle un nombre').bail()
        .isLength({ min:3 }).withMessage('El nombre debe tener mas de 3 caracteres'),
    check('direccion')
        .notEmpty().withMessage('Tienes que pasar una direccion').bail()
        .isLength({ min:6 }).withMessage('La direccion tiene que tener un minimo de 6 caracteres'),
    check('telefono')
        .notEmpty().withMessage('Tienes que pasar un teléfono').bail()
        .isNumeric().withMessage('Pasa un teléfono válido'),
]