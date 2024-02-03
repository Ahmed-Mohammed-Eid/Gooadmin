import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
// Model
import Post from "../../../Model/Post";
// Authentication Helpers
import {verifyToken} from "../../../helpers/Authentication_helpers";

const handler = nc();
// connect to db
dbConnect();

// Middleware for Authentication and Database Connection
handler.use(async (req, res, next) => {
    try {
        // Verify the Token
        const userData = await verifyToken(req);
        if (!userData) {
            res.status(401).json({success: false, message: "Unauthorized"});
            return;
        }

        // Set the User Data in the Request Object
        req.userData = userData;

        // Check the Database Connection
        const dbStatus = Post.db.readyState;
        if (dbStatus !== 1) {
            res.status(500).json({success: false, message: "Database Connection Error"});
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});


handler
    .put(async (req, res) => {
        // GET THE USER ID FROM THE REQ
        const userId_req = req.userData.user._id;
        const userRole_req = req.userData.user.role;

        // extract the mainImage, header, categories, postData, checked from the request
        const {
            postId,
            mainImgURL,
            mainImgID,
            header,
            categories,
            checked,
            savedData,
        } = req.body;

        // make an object of the data that are not null to set it in the database
        const updatedData = {};
        if (mainImgURL && mainImgID) {
            updatedData["mainImage"] = {
                url: mainImgURL,
                public_id: mainImgID,
            };
        }

        if (header) {
            updatedData["header"] = header;
        }

        if (categories) {
            updatedData["category"] = categories;
        }

        if (checked) {
            updatedData["published"] = checked;
        }

        if (savedData) {
            updatedData["postData"] = savedData;
        }

        // find the post in the database
        const post = await Post.findById(postId);

        // check if the post exists
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }

        // check if the user is the creator of the post
        if (post.userId !== userId_req) {
            if (userRole_req !== 'admin') {
                res.status(401).json({error: 'You are not authorized to update this post'});
                return;
            }
        }

        // update the post in the database
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        // if post is not updated then send error
        if (!updatedPost) {
            return res.status(400).json({
                success: false,
                message: "Post not updated",
            });
        }

        // if post is updated then send success
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
        });
    });

export default handler;
