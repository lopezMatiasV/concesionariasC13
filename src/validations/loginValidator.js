const {check, body} = require('express-validator')
const { Usuario } = require('../dataBase/models')
const bcrypt = require('bcryptjs')

module.exports = [
    check('email')
        .notEmpty().withMessage('debes ingresar un mail').bail()
        .isEmail().withMessage('pone un email válido'),
    body('email')
        .custom((value, {req}) => {
            return Usuario.findOne({
                where : { email : value}
            })
            .then(user => {
                if (!bcrypt.compareSync(req.body.pass, user.pass)){
                    return Promise.reject('Credenciales Invalidas')
                }
            })
            .catch(errors => {
                console.log(errors);
                return Promise.reject("Email o contraseña incorrecto")
            })
        }),

        check('pass')
            .notEmpty().withMessage('debes ingresar una contraseña').bail(),
]