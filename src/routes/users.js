let express = require('express');
let router = express.Router();
let { login, register, processRegister, processLogin, logout, profile, editProfile, deleteUser } = require('../controllers/usersControler')
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let upload = require('../middlewares/uploadAvatar')
let { inSession, offSession } = require('../middlewares/usersMiddlewares')

router
    .get('/login', inSession, login)
    .post('/login', loginValidator, processLogin)
    .get('/register', inSession, register)
    .post('/register', registerValidator, processRegister)
    .get('/logout', logout)
    .get('/perfil', offSession, profile)
    .put('/perfil/:id', upload.single('avatar'), editProfile)
    .delete('/deleteUser/:id', deleteUser)

module.exports = router;