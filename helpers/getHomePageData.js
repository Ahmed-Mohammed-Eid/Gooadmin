//Modal Imports
import Project from "../Model/Project";
import Post from "../Model/Post";
import Course from "../Model/Course";

//########### PROJECTS ###########
const getLastThreeProjects = async () => {
    // get the items
    const Projects = await Project.find().sort({ _id: -1 }).limit(3);
    return Projects;
};

//############ POSTS ############
const getLastThreePosts = async () => {
    // get the items
    const Posts = await Post.find().sort({ _id: -1 }).limit(3);
    return Posts;
};

//############ COURSES ############
const getLastThreeCourses = async () => {
    // get the items
    const Courses = await Course.find().sort({ _id: -1 }).limit(3);
    return Courses;
};

export async function getPostsAndProjectsAndCourses(req, res) {
    // get the last three projects
    const lastThreeProjects = await getLastThreeProjects();
    // get the last three posts
    const lastThreePosts = await getLastThreePosts();
    // get the last three Courses
    const lastThreeCourses = await getLastThreeCourses();

    // return the data
    res.status(200).json({ lastThreeProjects, lastThreePosts, lastThreeCourses });
}

// Test Function
export async function getSearchResult(req, res) {
    const searchTerm = req.query.keyword;

    if (!searchTerm || searchTerm.trim() === "") {
        res.status(404).json({ message: "Please Enter Valid Search term" });
        return;
    }
    // Search in Post collection by keywords
    const result = await Post.find({
        $or: [
            { header: { $regex: searchTerm, $options: "i" } },
            {
                "postData.blocks.data.text": {
                    $regex: searchTerm,
                    $options: "i",
                },
            },
        ],
    });

    // Search in Project collection by keywords
    const result2 = await Project.find({
        $or: [
            { nameOfProject: { $regex: searchTerm, $options: "i" } },
            {
                projectDescription: {
                    $regex: searchTerm,
                    $options: "i",
                },
            },
        ],
    });


    // Search in Project collection by keywords
    const result3 = await Course.find({
        $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            {
                description: {
                    $regex: searchTerm,
                    $options: "i",
                },
            },
        ],
    });

    // return the data
    res.status(200).json({ posts: result, projects: result2, courses: result3 });
}
