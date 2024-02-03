import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
// Helpers
import { createRandomNumber } from "../../../helpers/createRandomNumber";
// Model
import User from "../../../Model/Users";
// import sendEmail
import SendAMB_Email from "../../../config/sendInBlue";

const handler = nc();
dbConnect();

handler.post(async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match",
        });
    }

    // Create a random number with 6 digits for confirmation
    const confirmationNumber = createRandomNumber(6);

    // check if the user exists in the database
    const user = await User.findOne({ email });

    // if user exists and has a pending time for more than now return an error message with the time left
    if (user && user.pendingTime > Date.now()) {
        const timeLeft = Math.round((user.pendingTime - Date.now()) / 60000);
        return res.status(400).json({
            success: false,
            message: `You have to wait ${timeLeft} minutes before you can register again`,
        });
    }

    // check if user exists and if the user is verified or not
    if (user && user.confirmed) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    } else if (user && !user.confirmed) {
        // if the user exists but not confirmed, delete the user and create a new one
        await User.deleteOne({
            email,
        });
    }

    try {
        // Send Email
        SendAMB_Email(email, firstName, lastName, confirmationNumber);

        // Create a new user
        const user = await User.create({
            userImage: { url: "" },
            firstName,
            lastName,
            email,
            password,
            confirmationNumber: confirmationNumber,
            confirmationNumberExpires: Date.now() + 3600000, // 1 hour
        });

        res.status(201).json({
            success: true,
            userId: user._id,
            email: user.email,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

export default handler;
