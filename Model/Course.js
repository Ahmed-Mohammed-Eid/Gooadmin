import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title for the course.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please enter an image URL for the course.']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description for the course.']
    },
    youtubeLink: {
        type: String,
        required: [true, 'Please enter a YouTube link for the course.']
    },
    createdOnServerAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
