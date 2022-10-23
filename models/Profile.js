// user, title, bio, profilePics, links: {fb, twitter}, posts, bookmarks

const {Schema, model} = require('mongoose');
const User = require('./User');
const Post = require('./Posts');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    flowing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

const Profile = model('Profile', profileSchema);

module.exports = Profile;