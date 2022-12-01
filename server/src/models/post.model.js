const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

const postSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        music: {
            type: String,
            requried: false,
        },
        likes:{
            type:Number,
            required:false,
            default:0,
        },
        comments: [{
            text: String,
            postedBy: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User',
                unique:true,
            }
        }]

    }, {
    timestamps: true,
}
)

postSchema.plugin(toJSON);
postSchema.plugin(paginate)
const Post = mongoose.model('post', postSchema);
module.exports = Post