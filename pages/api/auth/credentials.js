import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import jwt from "jsonwebtoken";
import Users from "../../../Model/Users";
import { CompareMyPasswordWithTheHashedPassword } from "../../../helpers/Bcrypt_functions";

//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the Post Function
handler.post(async (req, res) => {
    // Get the login information from the request
    const { email, password } = req.body;

    // Check if Email is Valid email address with regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        res.status(404).json({
            message: "Email is not valid",
        });
        return;
    }

    try {
        // get user data from database
        let [user] = await Users.find({ email });

        // check if no user
        if (!user) {
            res.status(404).json({
                message: "User is not Exist. create new user",
            });
            return;
        }

        // Check if Password is at least 6 characters long
        if (password.length < 6) {
            res.status(404).json({
                message: "password is less than 6 characters",
            });
            return;
        }

        // check if the password matches
        if (user) {
            // Check if the password is correct
            const isMatch = await CompareMyPasswordWithTheHashedPassword(
                password,
                user.password
            );

            if (!isMatch) {
                res.status(404).json({
                    message: "password is incorrect",
                });
                return;
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

        res.status(200).json({ success: true, token });
    } catch (err) {
        console.log(err);
    }
});

export default handler;
