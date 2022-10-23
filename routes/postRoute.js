const router = require('express').Router();

const  postValidator = require('../validator/dashboard/post/postValidator');
const {isAuthenticate} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const {
    createPostGetController,
    createPostPostController,
    editPostGetController,
    editPostPostController,
    deletePostGetController,
    postsGetController
} = require('../controllers/postController')

router.get('/create', isAuthenticate, createPostGetController)
router.post('/create', isAuthenticate, upload.single('post-thumbnail'),  postValidator, createPostPostController)

router.get('/edit/:postId',isAuthenticate, editPostGetController)
router.post('/edit/:postId',isAuthenticate, upload.single('post-thumbnail'), postValidator,  editPostPostController)

router.get('/delete/:postId',isAuthenticate, deletePostGetController)

router.get('/',isAuthenticate, postsGetController)

module.exports = router;