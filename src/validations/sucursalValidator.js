const { check, body } = require('express-validator');
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