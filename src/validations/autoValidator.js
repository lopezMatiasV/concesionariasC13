const { check } = require('express-validator');
module.exports = [
    check('marca')
        .notEmpty().withMessage('Tienes que otorgarle un marca').bail()
        .isLength({ min:3 }).withMessage('La marca debe tener mas de 3 caracteres'),
    check('modelo')
        .notEmpty().withMessage('Tienes que otorgar un modelo').bail()
        .isLength({ min:3 }).withMessage('El modelo debe tener mas de 3 caracteres'),
    check('anio')
        .notEmpty().withMessage('Selecciona un año').bail()
        .isNumeric().withMessage('Pasa un año válido'),
    check('color')
        .notEmpty().withMessage('selecciona un color'),
    check('sucursal')
        .notEmpty().withMessage('selecciona una sucursal')
]