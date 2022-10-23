const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')

exports.flowingGetController = async (req, res, next) => {
    let {profileId} = req.params
    let flowing = null

    if(!req.user) {
        return res.status(403).json({
            error: `You are not authenticated user`
        })
    }

    let userId = req.user._id
    console.log(userId);

    try{
        let profile = await Profile.findById(profileId) // working

        if(profile.unflowing.includes(userId)) {
            await Profile.findOneAndUpdate(
                { _id: profileId},
                {$pull: {'unflowing': userId}}
            )
        }

        if(profile.flowing.includes(userId)) {
            await Profile.findOneAndUpdate(
                { _id: profileId},
                {$pull: {'flowing': userId}}
            )
            flowing = false
        } else {
            await Profile.findOneAndUpdate(
                { _id: profileId},
                {$push: {'flowing': userId}}
            )
            flowing = true
        }

        let updatedProfile = await Profile.findById(profileId)
        res.status(200).json({
            flowing,
            totalflowing: updatedProfile.flowing.length,
            // totaldislikes: updatedPost.dislikes.length
        })

    } catch (e){
        console.log(e);
        return res.status(500).json({
            error: `Server Error Occerred`
        })
    }
}


exports.unflowingGetController = async (req, res, next) => {
    let {postId} = req.params
    let disliked = null

    if(!req.user) {
        return res.status(403).json({
            error: `You are not authenticated user`
        })
    }

    let userId = req.user._id

    try{
        let post = await Post.findById(postId)

        if(post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId},
                {$pull: {'likes': userId}}
            )
        } 

        if(post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId},
                {$pull: {'dislikes': userId}}
            )
            disliked = false
        } else {
            await Post.findOneAndUpdate(
                { _id: postId},
                {$push: {'dislikes': userId}}
            )
            disliked = true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            disliked,
            totallikes: updatedPost.likes.length,
            totaldislikes: updatedPost.dislikes.length
        })

    } catch (e){
        console.log(e);
        return res.status(500).json({
            error: `Server Error Occerred`
        })
    }

}