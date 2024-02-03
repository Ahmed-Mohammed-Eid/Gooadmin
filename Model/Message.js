import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter the email'],
    },
    message: {
        type: String,
        required: [true, 'Please Enter the message'],
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdOnServerAt: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Messages || mongoose.model("Messages", MessageSchema);