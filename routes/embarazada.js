
const { Router } = require('express');
const { check } = require('express-validator');
const { get,create,update } = require('../controllers/embarazada');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(get));
router.post('/', secureAsync(create));
router.put('/', secureAsync(update))

module.exports = router; 