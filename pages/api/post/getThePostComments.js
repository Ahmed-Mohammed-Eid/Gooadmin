import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Comment from "../../../Model/comment";

const handler = nc();
dbConnect();

handler.get(async (req, res) => {
    // GET THE COMMENT DATA FROM THE BODY
    const {postId} = req.query;
    try {
        const posts = await Comment.find({postId});
        res.status(200).json({posts})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong while getting the Comments'})
    }
})

export default handler;