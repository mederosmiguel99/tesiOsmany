
const { Router } = require('express');
const { check } = require('express-validator');
const { create,get } = require('../controllers/hojaDeCargos');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(get));
router.post('/', secureAsync(create));

module.exports = router; 