import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Course from "../../../Model/Course";
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
            res.status(401).json({ success: false, message: "The User Has no Access to Edit the Course" });
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
handler.put(async (req, res) => {
    // GET THE COURSE ID FROM THE REQUEST
    const {ID} = req.query;
    // console.log(ID)
    // Extract the Form Data from the request
    const {title, youtubeLink, imageUrl, description} = req.body;
    // Check if All the Data is Exist
    if (!ID || ID === '') {
        res.status(404).json({success: false, message: 'The Course ID is not Exist 😢'})
        return;
    }
    let theUpdatedData = {};
    if (imageUrl && imageUrl !== '') {
        theUpdatedData['imageUrl'] = imageUrl;
    }
    if (title && title !== '') {
        theUpdatedData['title'] = title;
    }
    if (!youtubeLink || youtubeLink !== '') {
        theUpdatedData['youtubeLink'] = youtubeLink;
    }
    if (!description || description !== '') {
        theUpdatedData['description'] = description;
    }
    try {
        // console.log(theUpdatedData)
        // Create a new Course
        await Course.findByIdAndUpdate(ID, theUpdatedData, {new: true})
            .then((result) => {
                // send a response that everything went Good
                res.status(201).json({
                    message: "Course has Updated! 😊",
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