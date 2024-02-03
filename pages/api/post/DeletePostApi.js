import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Post from "../../../Model/Post";
// Authorization Helpers
import {verifyToken} from "../../../helpers/Authentication_helpers";

// Create a handler
const handler = nc();
// Connect to Database
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
        const dbStatus = Post.db.readyState;
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

// Handle post Method
handler.delete(async (req, res) => {
    // GET THE COURSE ID FROM THE REQUEST
    const {ID, creatorId} = req.query;
    const userId_req = req.userData.user._id;
    const userRole_req = req.userData.user.role;

    // Check if All the Data is Exist
    if (!ID || ID === '') {
        res.status(404).json({success: false, message: 'The Post ID is not Exist 😢'})
        return;
    }

    // Check if the user is Authenticated and Allowed to delete it
    if(userId_req !== creatorId){
        if(userRole_req !== 'admin'){
            res.status(404).json({success: false, message: 'The User token is Expired || The user has no Access to delete this Item'});
            return;
        }
    }

    try {
        // Create a new Course
        await Post.deleteOne({_id: ID})
            .then((result) => {
                // send a response that everything went Good
                res.status(201).json({
                    message: "Post Removed Successfully! 😊",
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({message: 'OOPS, Something Went Wrong 😭', error: error.message});
            });
    } catch (error) {
        // Send the error message && Array of errors message
        res.status(500).json({message: 'OOPS, Something Went Wrong 😭', error: error.message});
    }
});
export default handler;