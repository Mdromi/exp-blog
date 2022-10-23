const router = require('express').Router();

const {
    usersGetController
} = require('../controllers/userController');

const {
    isAuthenticate
} = require ('../middleware/authMiddleware')

router.get('/', isAuthenticate,  usersGetController)


module.exports = router;