import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Course from "../../../Model/Course";
// Authentication Helpers
import {verifyToken} from "../../../helpers/Authentication_helpers";


// Create a handler
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

        if (userData.user.role !== 'admin') {
            res.status(401).json({ success: false, message: "The User Has no Access to Create a course" });
            return;
        }

        // Set the User Data in the Request Object
        req.userData = userData;

        // Check the Database Connection
        const dbStatus = Course.db.readyState;
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
handler.post(async (req, res) => {
    // Extract the Form Data from the request
    const {title, youtubeLink, imageUrl, description} = req.body;
    // Check if All the Data is Exist
    if (!imageUrl || imageUrl === '') {
        res.status(404).json({success: false, message: 'Please Enter a valid Image 😢'})
        return;
    }
    if (!title || title === '') {
        res.status(404).json({success: false, message: 'Please Enter a valid title 😢'})
        return;
    }
    if (!youtubeLink || youtubeLink === '') {
        res.status(404).json({success: false, message: 'Please Enter a valid Playlist Link 😢'})
        return;
    }
    if (!description || description === '') {
        res.status(404).json({success: false, message: 'Please Enter a valid description 😢'})
        return;
    }
    try {
        // Create a new Course
        await Course.create({title, youtubeLink, imageUrl, description})
        // send a response that everything went Good
        res.status(201).json({
            message: "Course has created! 😊",
        });
    } catch (error) {
        // Send the error message && Array of errors message
        res.status(500).json({message: 'OOPS, Something Went Wrong 😭', error: error.message});
    }
});
export default handler;