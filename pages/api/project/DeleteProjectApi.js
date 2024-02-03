import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Project from "../../../Model/Project";
// Authentication Helpers
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

        if (userData.user.role !== 'admin') {
            res.status(401).json({ success: false, message: "The User Has no Access to Delete the Project" });
            return;
        }

        // Set the User Data in the Request Object
        req.userData = userData;

        // Check the Database Connection
        const dbStatus = Project.db.readyState;
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
    const {ID} = req.query;
    // Check if All the Data is Exist
    if (!ID || ID === '') {
        res.status(404).json({success: false, message: 'The Project ID is not Exist 😢'})
        return;
    }
    try {
        // Create a new Course
        await Project.deleteOne({_id: ID})
            .then((result) => {
                // send a response that everything went Good
                res.status(201).json({
                    message: "Project Removed Successfully! 😊",
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