const { Router } = require('express');
const { login, register } = require('../controllers/auth');
const { check } = require('express-validator');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();
router.post('/login',
    [
        check('email', 'You must provide an user id').isEmail(),
        check('password', 'You must provide an user password')],
    secureAsync(login))

router.post('/register',
    [
        check('email', 'You must provide an user id').isEmail(),
        check('password', 'You must provide an user password')],
    secureAsync(register))
module.exports = router;