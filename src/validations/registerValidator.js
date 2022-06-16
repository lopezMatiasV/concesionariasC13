const {check, body} = require('express-validator')
const {getUsers} = require('../data/dataBase')

module.exports = [
    check('nombre')
        .notEmpty().withMessage('debes ingresar un nombre').bail()
        .isLength({min : 3}).withMessage('pone un nombre que sea de mas de 3 caracteres'),

    check('apellido')
        .notEmpty().withMessage('debes ingresar un apellido').bail()
        .isLength({min : 3}).withMessage('pone un apellido que sea de mas de 3 caracteres'),
    
    check('email')
        .notEmpty().withMessage('debes ingresar un mail').bail()
        .isEmail().withMessage('pone un email válido'),
    body('email')
        .custom(value => {
            let usuario = getUsers.find(user => user.email === value)
            if(!usuario){
                return true
            }else{
                return false
            }
        })
        .withMessage('el email ya esta registrado'),

    check('pass')
        .notEmpty().withMessage('debes ingresar una contraseña').bail(),

    check('pass2')
        .notEmpty().withMessage('debes ingresar otra vez tu contraseña').bail()
        .custom((value, {req}) => {
            if(value !== req.body.pass){
                return false
            }
            return true
        })
        .withMessage('Las contraseñas no coinciden'),

]