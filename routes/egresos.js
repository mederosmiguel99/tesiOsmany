
const { Router } = require('express');
const { check } = require('express-validator');
const { create, get, getPorFechaSalaCarnet } = require('../controllers/egresos');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(get));
router.post('/', secureAsync(create));
router.post('/getConCondicion', secureAsync(getPorFechaSalaCarnet));

module.exports = router; 