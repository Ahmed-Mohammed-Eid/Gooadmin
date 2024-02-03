import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import Users from "../../../../Model/Users";

//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the Post Function
handler.get(async (req, res) => {
    // Google client data
    const googleClient = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        process.env.REDIRECT_URI
    );

    const code = req.query.code;

    try {
        const { tokens } = await googleClient.getToken(code);
        googleClient.setCredentials(tokens);
        const { data } = await google
            .oauth2("v2")
            .userinfo.get({ auth: googleClient });
        // get user data from database
        let [user] = await Users.find({ email: data.email });
        // Check if user is exist return user data else create a new user
        if (!user || user.length <= 0) {
            try {
                // if the user doesn't exist, create a new user
                user = await Users.create({
                    _id: data._id,
                    userImage: { url: data.picture },
                    firstName: data.given_name,
                    lastName: data.family_name,
                    email: data.email,
                    password: "googleSignIn",
                    role: "user",
                    confirmed: true,
                });
            } catch (err) {
                console.log(err);
            }
        }
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
        //create token and user should complete his profile to get use of our services
        const token = jwt.sign(
            {
                user: dataToReturn,
            },
            process.env.SECRET,
            { expiresIn: "7days" }
        );

        // decode
        const decodedUser = jwt.decode(token, process.env.SECRET);
        res.redirect("/?token=" + token);
    } catch (err) {
        console.log(err);
    }
});

export default handler;