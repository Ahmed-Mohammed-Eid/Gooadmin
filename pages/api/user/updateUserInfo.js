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


handler
    .put(async (req, res) => {
        // Get the user id from the request
        const { UE, firstName, lastName, username } = req.body;

        const url = req.body.userImage.url;
        const id = req.body.userImage.id;

        //  object for the valid user data to be updated
        const validData = {};

        if (UE) {
            if (firstName) validData.firstName = firstName;
            if (lastName) validData.lastName = lastName;
            if (username) validData.username = username;
            if (url && id) {
                if (validData.userImage) {
                    validData.userImage.url = url;
                    validData.userImage.Img_Id = id;
                } else {
                    validData.userImage = { url: url, Img_Id: id };
                }
            }
        }

        // Update the user data
        if (UE) {
            try {
                await User.findOneAndUpdate({ email: UE }, validData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                });
                res.status(200).json({ success: true });
            } catch (err) {
                res.status(400).json({ success: false, validData });
            }
        }
    });

export default handler;
