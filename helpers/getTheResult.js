import dbConnect from "../config/dbConnect";
import Post from "../Model/Post";
import Project from "../Model/Project";
import Course from "../Model/Course";


export async function getTheResult({search, page, categories, time, ID}) {
    //Search object if every item is not empty put it in the search object
    const searchObject = {};
    if (search) searchObject.header = {$regex: search, $options: 'i'};
    if (categories) {
        // Convert the categories to array
        const arrayOfCategories = categories.split(',');

        // If categories are provided, check if all of them exist in the category array
        searchObject.category = {$all: arrayOfCategories};
    } else {
        // If no categories are provided, return all items in the collection
        searchObject.category = {$exists: true};
    }

    if(ID) searchObject.userId = ID;
    if (time) {
        if (time === 'last month') {
            searchObject.createdAt = {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}
        } else if (time === 'last year') {
            searchObject.createdAt = {$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        }
    }

    //Fetch data from database
    const result = await Post.find(searchObject).limit(10).skip((page - 1) * 10).sort({createdOnServerAt: -1});

    //Get the Length Of the Post Collection
    const postLength = await Post.find(searchObject).countDocuments();

    return { result: result, postLength: postLength };
};


export async function getThePortfolioResult({search, page, categories, date}) {
    //Search object if every item is not empty put it in the search object
    const searchObject = {};
    if (search) searchObject.nameOfProject = {$regex: search, $options: 'i'};
    if (categories) {
        // Convert the categories to array
        const arrayOfCategories = categories.split(',');

        // If categories are provided, check if all of them exist in the category array
        searchObject.technologies = {$all: arrayOfCategories};
    } else {
        // If no categories are provided, return all items in the collection
        searchObject.technologies = {$exists: true};
    }

    if (date) {
        if (date === 'last month') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}
        } else if (date === 'last year') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        }
    }

    //Fetch data from database
    const result = await Project.find(searchObject).limit(4).skip((page - 1) * 4).sort({createdOnServerAt: -1});
    //Get the Length Of the Post Collection
    const projectLength = await Project.find(searchObject).countDocuments();
    return { result: result, projectLength: projectLength };
}

export async function getTheCoursesResult({search, page, date}) {
    //Search object if every item is not empty put it in the search object
    const searchObject = {};
    if (search) searchObject.title = {$regex: search, $options: 'i'};
    if (date) {
        if (date === 'last month') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}
        } else if (date === 'last year') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        }
    }

    //Fetch data from database
    const result = await Course.find(searchObject).limit(4).skip((page - 1) * 4).sort({createdOnServerAt: -1});
    //Get the Length Of the Post Collection
    const coursesLength = await Course.find(searchObject).countDocuments();
    return { result: result, coursesLength: coursesLength };
}

// get All Posts Ids For The Post Preview
export async function getAllPostsIdsForThePostPreview() {
    await dbConnect();
    const posts = await Post.find({});
    return posts.map((post) => {
        return {
            params: {
                postId: post._id.toString(),
            },
        };
    });
}

// get All Projects Ids For The Project Preview
export async function getAllProjectsIdsForTheProjectPreview() {
    await dbConnect();
    const projects = await Project.find({});
    return projects.map((project) => {
        return {
            params: {
                projectId: project._id.toString(),
            },
        };
    });
}