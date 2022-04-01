let express = require('express');
let router = express.Router();
let { login, register, processRegister } = require('../controllers/usersControler')

router.get('/login',  login);
router.get('/register', register)
router.post('/register', processRegister)

module.exports = router;