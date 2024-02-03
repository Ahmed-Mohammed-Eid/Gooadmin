import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import create_project from "../../../helpers/create_project";
import {verifyToken} from "../../../helpers/Authentication_helpers";

//Create the Handler
const handler = nc();
//Connect to Database
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
            res.status(401).json({ success: false, message: "The User Has no Access to Create a Project" });
            return;
        }

        // Set the User Data in the Request Object
        req.userData = userData;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// the Post Function
handler.post(create_project);


export default handler;