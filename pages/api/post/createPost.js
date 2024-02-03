import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import create_post from '../../../helpers/create_post';
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

        // Set the User Data in the Request Object
        req.userData = userData;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// the Post Function
handler.post(create_post);


export default handler;