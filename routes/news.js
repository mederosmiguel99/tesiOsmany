
const { Router } = require('express');
const { body } = require('express-validator');
const { getNews, addNews } = require('../controllers/news');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { secureAsync } = require('../middlewares/ErrorValidator');
const router = Router();

router.get('/', secureAsync(getNews));
router.post('/', secureAsync(addNews));


module.exports = router; 