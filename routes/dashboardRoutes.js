const router = require('express').Router();
const {isAuthenticate} = require('../middleware/authMiddleware');
const profileValidator = require('../validator/dashboard/profileValidator');

const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGettController,
    editProfilePostController,
    bookmarksGetController,
    commnetsGetController,
} = require('../controllers/dashboardControllers');



router.get('/bookmarks', isAuthenticate,  bookmarksGetController)
router.get('/comments', isAuthenticate,  commnetsGetController)

router.get('/create-profile', isAuthenticate, createProfileGetController)
router.post('/create-profile', isAuthenticate, profileValidator, createProfilePostController)

router.get('/edit-profile', isAuthenticate, editProfileGettController)
router.post('/edit-profile', isAuthenticate, profileValidator, editProfilePostController)

router.get('/', isAuthenticate, dashboardGetController)

module.exports = router;