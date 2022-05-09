let express = require('express');
let router = express.Router();
let { login, register, processRegister, processLogin, logout } = require('../controllers/usersControler')
let loginValidator = require('../validations/loginValidator')

router.get('/login', login);
router.post('/login', loginValidator, processLogin)
router.get('/register', register)
router.post('/register', processRegister)
router.get('/logout', logout)

module.exports = router;