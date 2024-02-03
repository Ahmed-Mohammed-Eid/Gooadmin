import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please enter the comment content"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user ID is not found"],
    },
    userName: {
        type: String,
        required: [true, "The user NAME is not found"],
    },
    userImage: {
        type: String,
        required: [true, "The user Image is not found"],
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "The post ID is not found"],
    },
    createdOnServerAt: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
