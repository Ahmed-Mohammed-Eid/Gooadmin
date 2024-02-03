import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { OAuth2Client } from "google-auth-library";


//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the Post Function
handler.get((req, res) => {
    const googleClient = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        process.env.REDIRECT_URI
    );
    const url = googleClient.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
    });
    res.json({ success: true, url });
});

export default handler;
