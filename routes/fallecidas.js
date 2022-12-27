
const { Router } = require('express');
const { check } = require('express-validator');
const { get, create, getPorFechaSalaCarnet, getPorCarnet,update } = require('../controllers/fallecidas');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(get));
router.post('/', secureAsync(create));
router.post('/getConCondicion', secureAsync(getPorFechaSalaCarnet));
router.post('/getporCarnet', secureAsync(getPorCarnet));
router.put('/', secureAsync(update))
module.exports = router; 