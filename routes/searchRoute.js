const router = require('express').Router();

const {serachResultGetController}  = require('../controllers/searchController')

router.get('/', serachResultGetController)


module.exports = router;