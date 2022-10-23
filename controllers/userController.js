const Flash = require('../utils/Flash')

const Profile = require('../models/User');


exports.usersGetController = async (req, res, next) => {
    try{
        let profile = await Profile.find()
        .populate('profile')
        populate: ({
            path: 'links',
        })
        // console.log(profile);
    
        let flowing = []
        let flowers = []

        let userId = ''
        if(req.user) {
            let profile = await Profile.findOne({user: req.user._id})
            if(profile) {
                flowing = profile.flowing
                flowers = profile.flowers
                userId = req.user._id.toString()
            }
        }

        // res.json({message: 'successfully'})
        res.render('pages/users/users', {
            title: 'All Users',
            flashMessage: Flash.getMessage(req),
            profile,
            userId : req.user._id.toString()
        })
    } catch (e){
        next(e)
    }
}