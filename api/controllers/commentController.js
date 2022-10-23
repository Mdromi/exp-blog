const Post = require('../../models/Posts')
const Comment = require('../../models/Comment')


exports.commentPostController = async (req, res, next) => {
    let {postId} = req.params
    let {body} = req.body

    if(!req.user) {
        return res.status(403).json({
            error: `You are not authenticated user`
        })
    }

    let comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try{
        let createComment = await comment.save()
        await Post.findOneAndUpdate(
            { _id: postId},
            {$push: {'comments': createComment._id}}
        )

        let commentJSON = await Comment.findById(createComment._id).populate({
            path: 'user',
            select: `profilePics username`
        })

        return res.status(201).json(commentJSON)

    } catch (e){
        console.log(e);
        return res.status(500).json({
            error: `Server Error Occerred`
        })
    }

}


exports.replyCommentPostController = async (req, res, next) => {
    let { body } = req.body
    let {commentId} = req.params

    if(!req.user) {
        return res.status(403).json({
            error: `You are not authenticated user`
        })
    }

    let reply = {
        body,
        user: req.user._id
    }

    try {
        await Comment.findOneAndUpdate(
            { _id: commentId},
            {$push: {'replies': reply}}            
        )

        res.status(201).json({
            ...reply,
            profilePics: req.user.profilePics
        })
        
    }  catch (e){
        console.log(e);
        return res.status(500).json({
            error: `Server Error Occerred`
        })
    }

}


exports.deleteCommentGetController = async (req, res, next) => {
    let { commentId } = req.params
    // console.log(req.user._id);
    try{
        let postComment = await Comment.findById(commentId)
        let postId = postComment.post

        await Comment.findOneAndDelete({ _id: commentId })
        await Post.findOneAndUpdate(
            { comments: commentId },
            {$pull: {'comments': commentId}}
        )

        let post = await Post.findById(postId)
            .populate('author', 'username profilePics')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePics'
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'username profilePics'
                }
            })

        // console.log(post.comments);
        let postComments = post.comments

        res.status(201).json({
            postComments,
        })

    }catch (e){
        console.log(e);
        return res.status(500).json({
            error: `Server Error Occerred`
        })
    }
    
}