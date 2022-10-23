// post, user, body, replies

const {Schema, model} = require('mongoose');
const User = require('./User');
const Post = require('./Posts');

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            createAt: {
                type: Date,
                default: new Date()
            }
        },    
    ]
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = Comment;