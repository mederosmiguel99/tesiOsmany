const { Router } = require('express');
const { login, register } = require('../controllers/auth');
const { check } = require('express-validator');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();
router.post('/login',
    [
        check('registroMedico', 'You must provide an user id'),
        check('password', 'You must provide an user password')],
    secureAsync(login))

router.post('/register',
    [
        check('registroMedico', 'You must provide an user id'),
        check('password', 'You must provide an user password'),
        check('name', 'You must provide a name')],
    secureAsync(register))
module.exports = router;