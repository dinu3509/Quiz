const router = require('express').Router();
const {getQuizById} = require('../Controllers/WriteController')
router.get('/:id', getQuizById);
module.exports = router