import nc from "next-connect";
import jwt from "jsonwebtoken";
import dbConnect from "../../../config/dbConnect";
import Users from "../../../Model/Users";
// import {verifyToken} from "../../../helpers/Authentication_helpers";

const handler = nc();

// Connect to db
dbConnect();

// Middleware for Authentication and Database Connection
handler.use(async (req, res, next) => {
    try {
        // Verify the Token
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ success: false, message: "There is no token" });
            return;
        }

        // Set the User Data in the Request Object
        req.userToken = token;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// Auth function check
handler.get(async (req, res) => {
    // Get the token
    const token = req.userToken;

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(decoded.user.email);
        // Get the user data from the server to check if something changed
        // get user data from database
        let [user] = await Users.find({ email: decoded.user.email }); // Return the authenticated user data

        // Data that will return in the response
        const dataToReturn = {
            _id: user._id,
            userImage: user.userImage,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            confirmed: user.confirmed,
            username: user.username,
        };

        return res.status(200).json({ user: dataToReturn });
    } catch (error) {
        // Return a 401 error if the token is invalid
        return res.status(401).json({ message: "Unauthorized" });
    }
});

export default handler;
