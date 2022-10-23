const bcrypt = require('bcrypt');
const User = require('../models/User');
const Profile = require('../models/User');

const {validationResult} = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const Flash = require('../utils/Flash');

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', 
        {
            title: 'Create A New Account',
            error: {},
            value: {},
            flashMessage: Flash.getMessage(req)
        });
}

exports.signupPostController = async (req, res, next) => {
    let {username, email, password} = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);

    if(!errors.isEmpty()) {
        req.flash('fail', 'Please Check Your Form');
        // return console.log(errors.mapped());
        return res.render('pages/auth/signup', 
            {
                title: 'Create A New Account', 
                error: errors.mapped(),
                value: {
                    username, email, password
                },
                flashMessage: Flash.getMessage(req),
            });
    }

    try{
        let hasjPassword = await bcrypt.hash(password, 11);

        let user = new User({
            username,
            email,
            password: hasjPassword
        });

        await user.save();
        req.flash('success', 'User Created Successfully');
        res.redirect('/auth/login');
        
    } catch (e){
        next(e);
    }
}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user);
    res.render('pages/auth/login',
    {
        title: 'Login to your Account',
        error: {},
        value: '',
        flashMessage: Flash.getMessage(req),
    });
}

exports.loginPostController = async (req, res, next) => {
    let {email, password} = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);

    if(!errors.isEmpty()) {
        req.flash('fail', 'Please Check Your Form');
        // return console.log(errors.mapped());
        return res.render('pages/auth/login', 
            {
                title: 'Login to your Account', 
                error: errors.mapped(),
                value: '',
                flashMessage: Flash.getMessage(req),
            });
    }

    try{
        let user = await User.findOne({email});
        if(!user) {
            req.flash('fail', 'Please Provide Valid Credential');
            return res.render('pages/auth/login',
            {
                title: 'Login to your Account',
                error: {},
                value: 'Invalid Credential',
                flashMessage: Flash.getMessage(req),
            });
        } 

        let match = await bcrypt.compare(password, user.password);
        if(!match) {
            req.flash('fail', 'Please Provide Valid Credential');
            return res.render('pages/auth/login',
            {
                title: 'Login to your Account',
                error: {},
                value: 'Invalid Credential',
                flashMessage: Flash.getMessage(req),
            });
        } 
        // console.log('Successfully Loged In', user);

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if(err) {
                return next(err)
            }
            req.flash('success', 'Successfully Logged In');
            res.redirect('/dashboard')
        })

    } catch (e){
        next(e);
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            return next(err)
        }
        // req.flash('success', 'Successfully Logged Out');
        return res.redirect('/auth/login')
    })
}


exports.changePasswordGetController = async (req, res, next) => {
    res.render('pages/auth/changePassword',
    {
        title: 'Change My Password',
        flashMessage: Flash.getMessage(req),
    });
}

exports.changePasswordPostController = async (req, res, next) => {

    let {oldPassword, newPassword, confirmPassword} = req.body

    if(newPassword !== confirmPassword) {
        req.flash('fail','Password Does Not Match')
        return res.redirect('/auth/change-password')
    }

    try{
        let match = await bcrypt.compare(oldPassword, req.user.password);
        if(!match) {
            req.flash('fail', 'Invalid Old Password');
            return res.redirect('/auth/change-password')
        } 
        let hash = await bcrypt.hash(newPassword, 11);

        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: {password: hash}}
        )

        req.flash('success', 'Password Updated Successfully');
        return res.redirect('/auth/change-password')

    }catch (e){
        next(e)
    }
}

