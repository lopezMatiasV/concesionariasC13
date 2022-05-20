let express = require('express');
let router = express.Router();
let { login, register, processRegister, processLogin, logout, profile, editProfile } = require('../controllers/usersControler')
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let upload = require('../middlewares/uploadAvatar')

router.get('/login', login);
router.post('/login', loginValidator, processLogin)
router.get('/register', register)
router.post('/register', registerValidator, processRegister)
router.get('/logout', logout)
router.get('/perfil', profile)
router.put('/perfil/:id', upload.single('avatar'), editProfile)


module.exports = router;