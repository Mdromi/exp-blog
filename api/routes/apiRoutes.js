const router = require('express').Router();

const {isAuthenticate} = require('../../middleware/authMiddleware')

const {
    commentPostController,
    replyCommentPostController,
    deleteCommentGetController
} = require('../controllers/commentController')

const {
    likeGetController,
    dislikeGetController
} = require('../controllers/likeDislikeController')

const {
    bookmarksGetController
} = require('../controllers/bookmarkController')

const {
    flowingGetController,
    unflowingGetController
} = require('../controllers/flowingFlowController')


router.post('/comments/:postId', isAuthenticate,  commentPostController)
router.post('/comments/replies/:commentId', isAuthenticate, replyCommentPostController)
router.get('/comment/delete/:commentId', isAuthenticate, deleteCommentGetController)

router.get('/likes/:postId', isAuthenticate, likeGetController)
router.get('/dislikes/:postId', isAuthenticate, dislikeGetController)

router.get('/bookmarks/:postId', isAuthenticate, bookmarksGetController)

router.get('/flowing/:profileId', isAuthenticate, flowingGetController)


module.exports = router