import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import User from "../../../Model/Users";
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
        const dbStatus = User.db.readyState;
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

handler.get(async (req, res) => {

    const { username } = req.query;

    // Check if the username is already taken or not by searching for it in the database
    const user = await User.findOne({ username: username });

    // If the user is found, return an error
    if (user) {
        res.status(200).json({ isValid: false });
    } else {
        res.status(200).json({ isValid: true });
    }
});

export default handler;
