import mongoose, { models } from "mongoose";

const ProjectSchema = new mongoose.Schema({
    nameOfProject: {
        type: String,
        required: [true, "please enter the project name"],
        maxLength: [40, "project max length is 40 characters"],
        // unique: [true, "Please choose a unique name"],
    },
    nameOfCreator: {
        type: String,
        required: [true, "Please enter the name Of the Creator"],
        maxLength: [30, "Creator name must be less than 30 character"],
    },
    projectDescription: {
        type: String,
        required: [true, "please enter the Project description"],
    },
    livePreviewLink: {
        type: String,
        required: [true, "please enter the Project live link"],
        // unique: [true, "the link of the live project should be unique"],
    },
    githubLink: {
        type: String,
        // unique: [true, "the link of the github project should be unique"],
    },
    createdAtInReal: {
        type: Date,
    },
    createdOnServerAt: {
        type: Date,
        default: () => new Date(),
    },
    technologies: {
        type: [String],
        required: [true, "please enter the Project technologies"],
    },
    mainImage: {
        type: {
            url: String,
            Img_Id: String,
        },
        required: [true, "please enter the main image"],
    },
    sliderImages: {
        type: [
            {
                url: String,
                Img_Id: String,
            },
        ],
        required: [true, "please enter the slider images"],
    },
    projectVideo: {
        type: {
            url: String,
            video_Id: String,
            format: String,
        },
        required: [true, "please enter the project video"],
    },
    published: {
        type: Boolean,
        default: true,
    },
});

ProjectSchema.index({
    nameOfProject: 1,
})


export default mongoose.models.Projects ||
    mongoose.model("Projects", ProjectSchema);
