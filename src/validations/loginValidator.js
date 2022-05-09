const {check, body} = require('express-validator')
const {getUsers} = require('../data/dataBase')

module.exports = [
    check('email')
        .notEmpty().withMessage('debes ingresar un mail').bail()
        .isEmail().withMessage('pone un email válido'),
    body('email')
        .custom(value => {
            let userEncontrado = getUsers.find( user => user.email === value)
            if (userEncontrado !== undefined){
                return true
            }else{
                return false
            }
        })
        .withMessage('no estas registrado'),

        check('pass')
            .notEmpty().withMessage('debes ingresar una contraseña').bail(),

        body('pass')
            .custom((value, {req}) => {
                let userEncontrado = getUsers.find(user => user.email === req.body.email)
                
                if(userEncontrado.pass === value) {
                    return true
                }else{
                    return false
                }
            })
        .withMessage('contraseña invalida')

]