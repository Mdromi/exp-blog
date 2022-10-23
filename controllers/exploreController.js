const moment = require('moment')

const Flash = require('../utils/Flash')
const Post = require('../models/Posts')
const Profile = require('../models/Profile')

function getDate(days){
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function postPermalinks(title, postId) {
    return {
        titlePostId: postId,
        title: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };
 }

async function getPostId(postId) {
    postId = postId[0]
    console.log(postId.per);
    // console.log(post);
}

function generateFilterObject(filter) {
    let filterObj = {}
    let order = 1

    switch(filter) {
        case 'week' : {
            filterObj: {
                createdAt: {
                    $gt: getDate(7)
                }
            }
            order = -1
            break
        }
        case 'month' : {
            filterObj: {
                createdAt: {
                    $gt: getDate(30)
                }
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }

    return {
        filterObj,
        order
    }
}

exports.explorerGetController = async (req, res, next) => {

    let filter = req.query.filter || 'latest'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 5
    let {filterObj, order} = generateFilterObject(filter.toLowerCase())

    try{
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        let totalPost = await Post.countDocuments()
        let totalPage = totalPost / itemPerPage
        let bookmarks = []

        if(req.user) {
            let profile = await Profile.findOne({user: req.user._id})
            if(profile) {
                bookmarks = profile.bookmarks
            }
        }


        res.render('pages/explorer/explorer', {
            title: 'Explore All Posts',
            filter,
            flashMessage: Flash.getMessage(req),
            posts,
            itemPerPage,
            currentPage,
            totalPage,
            bookmarks,
        })

    }catch (e){
        next(e)
    }

}


exports.singlePostGetController = async (req, res, next) => {
    let {postId} = req.params
    // console.log(postId)

    // postId = await getPostId(postId)
    // const {parcel} = req.body
    // console.log(parcel);
    

    try{
        let post = await Post.findById(postId)
        .populate('author', 'username profilePics')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePics '
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'username profilePics'
                }
            })
        // console.log(post);
        
        if(!post) {
            let error = new Error(`404 Page Not Found`)
            error.status = 404
            throw error
        }

        let bookmarks = []
        let userId = ''
        if(req.user) {
            let profile = await Profile.findOne({user: req.user._id})
            if(profile) {
                bookmarks = profile.bookmarks
                userId = req.user._id.toString()
            }
        }
        let authorPostId = post.author._id.toString()
        console.log(postId);

        // res.status(200).json({
        //     postId
        // })

        res.render('pages/explorer/singlePage', {
            title: post.title,
            flashMessage: Flash.getMessage(req),
            post,
            bookmarks,
            userId,
            authorPostId,
        })


    }catch (e){
        next(e)
    }
}
