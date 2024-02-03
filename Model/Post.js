import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    mainImage: {
        type: {
            url: String,
            public_id: String
        },
        required: [true, 'Please Enter the post main image']
    },
    header: {
        type: String,
        required: [true, 'Please Enter the Post Header'],
    },
    Author: {
        AuthorName: {
            type: String,
            required: [true, 'Please Enter the Author Name']
        },
        AuthorImage: {
            type: {
                url: String,
                public_id: String
            },
            required: [true, 'Please Enter the Author Image'],
        }
    },
    postData: {
        type: {},
        required: [true, 'Please Enter the Post Data']
    },
    published: {
        type: Boolean,
        default: true
    },
    category: {
        type: [String],
        required: [true, 'Please Enter the Post Category']
    },
    userId: {
        type: String,
        required: [true, 'The User ID is not found']
    },
    createdOnServerAt: {
        type: Date,
        default: () => new Date(),
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],

});

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);


