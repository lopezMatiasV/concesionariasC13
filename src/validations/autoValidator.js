const { check, body } = require('express-validator');
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
    check('sucursalId')
        .notEmpty().withMessage('selecciona una sucursal'),
    body('image')
        .custom(( value, {req} ) => {
            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!req.file){
                return Promise.reject('campo requerido')
            }if(!allowedExtensions.exec(req.file.filename)){
                return Promise.reject('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif only.')
            }else{
                return true
            }
        })
]