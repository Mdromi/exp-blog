const User = require('../models/User');

exports.bindUserWithRequest =  () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn) {
            return next()
        }

        try{
            let user = await User.findById(req.session.user._id)
            req.user = user
            next();
        } catch (e){
            console.log(e);
            next(e);
         }

    }
}

exports.isAuthenticate =  (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }
    next()
}

exports.isUnAuthenticate =  (req, res, next) => {
    if(req.session.isLoggedIn) {
        return res.redirect('/dashboard')
    }
    next()
}