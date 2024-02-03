import Post from "../Model/Post";
import dbConnect from "../config/dbConnect";

const getPostById = async (id) => {

    dbConnect()

    const post = await Post.findById(id);
    return post;
}

export default getPostById;

export const getSuggestedPosts = async (postId, category) => {
    const posts = await Post.find({_id: { $ne: postId}, category: { $all: [category] }}).limit(3);
    return posts;
}