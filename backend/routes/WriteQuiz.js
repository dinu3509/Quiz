const router = require('express').Router();
const {getQuizById} = require('../Controllers/WriteController')
const { postResult } = require('../Controllers/QuizResult');
const ensureAuthenticated = require('../Middlewares/Auth')
router.get('/:id', getQuizById);
router.post('/result',ensureAuthenticated,postResult)
module.exports = router