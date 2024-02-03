import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Comment from "../../../Model/comment";
// Authentication Helpers
import {verifyToken} from "../../../helpers/Authentication_helpers";

const handler = nc();
dbConnect();

// Middleware for Authentication and Database Connection
handler.use(async (req, res, next) => {
    try {
        // Verify the Token
        const userData = await verifyToken(req);

        if (!userData) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        // Set the User Data in the Request Object
        req.userData = userData;

        // Check the Database Connection
        const dbStatus = Comment.db.readyState;
        if (dbStatus !== 1) {
            res.status(500).json({ success: false, message: "Database Connection Error" });
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

handler.delete(async (req, res) => {
    // GET THE COMMENT DATA FROM THE BODY
    const {userId, commentId} = req.query;
    const userId_req = req.userData.user._id;

    try {
        const result = await Comment.findOneAndDelete({_id: commentId, userId_req});
        // console.log(result);
        res.status(201).json({message: 'Comment Deleted Successfully'})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong while Deleting the Comment'})
    }
})

export default handler;