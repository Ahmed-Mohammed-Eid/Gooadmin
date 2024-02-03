import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getSuggestedPosts } from "../../../helpers/getPostById";

const handler = nc();

dbConnect();

handler.get((req, res) => {
    getSuggestedPosts(req.query.postId, req.query.category).then((posts) => {
        res.status(200).json({
            success: true,
            posts,
        });
    });
});

export default handler;
