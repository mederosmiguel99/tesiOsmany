
const { Router } = require('express');
const { check } = require('express-validator');
const { create, get, getPorFechaSalaCarnet, getPorCarnet } = require('../controllers/egresos');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(get));
router.post('/', secureAsync(create));
router.post('/getConCondicion', secureAsync(getPorFechaSalaCarnet));
router.post('/getporCarnet', secureAsync(getPorCarnet));

module.exports = router; 