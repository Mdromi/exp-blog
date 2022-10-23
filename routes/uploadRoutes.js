const router = require('express').Router();

const {isAuthenticate} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const {
    uploadProfilePics,
    removeProfilePics,
    postImageUploadController
} = require('../controllers/uploadController')


router.post('/profilePics', 
    isAuthenticate,
    upload.single('profilePics'),
    uploadProfilePics
)

router.delete('/profilePics', isAuthenticate, removeProfilePics)

router.post('/postimage', 
    isAuthenticate, 
    upload.single('post-image'),
    postImageUploadController
)



module.exports = router;