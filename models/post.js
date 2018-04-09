const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    }
})




const PostModel = mongoose.model('Post' , PostSchema);



module.exports = PostModel;