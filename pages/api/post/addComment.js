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

// POST FUNCTION
handler.post(async (req, res) => {
    // GET THE COMMENT DATA FROM THE BODY
    const {text, userId, userName, userImage, postId} = req.body;
    try {
        await Comment.create({content: text, userId, userName, userImage: userImage? userImage :'local', postId});
        res.status(201).json({message: 'Comment Created'})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong while creating the Comment'})
    }
})

export default handler;