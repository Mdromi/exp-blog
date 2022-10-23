const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginvalidator = require('../validator/auth/loginvalidator');

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController,
    changePasswordGetController,
    changePasswordPostController,
} = require('../controllers/authController');

const {
    isUnAuthenticate,
    isAuthenticate
} = require ('../middleware/authMiddleware')




router.get('/signup', isUnAuthenticate,  signupGetController);
router.post('/signup', isUnAuthenticate, signupValidator, signupPostController);

router.get('/login', isUnAuthenticate, loginGetController);
router.post('/login', isUnAuthenticate, loginvalidator, loginPostController);

router.get('/change-password', isAuthenticate, changePasswordGetController)
router.post('/change-password', isAuthenticate, changePasswordPostController)

router.get('/logout', logoutController);




module.exports = router;