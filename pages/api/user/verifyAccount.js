import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

// Import user model
import User from "../../../Model/Users";

const handler = nc();
dbConnect();

handler.post(async (req, res) => {
    // Get the code from the request and UI, UE from the request
    const { code, UI, UE } = req.body;

    // Check if the code is 6 characters long
    if (code.length !== 6 || isNaN(+code)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid code",
        });
    }

    // Check if the user exists
    const user = await User.findOne({ _id: UI, email: UE });

    // get the confirmationNumber, confirmationNumberExpires and confirmationTringNumber from the user
    const {
        confirmationNumber,
        confirmationNumberExpires,
        confirmationTringNumber,
    } = user;

    // if the confirmationNumberExpires is less than the current time, return an error
    if (confirmationNumberExpires < Date.now()) {
        return res.status(400).json({
            success: false,
            message: "The code has expired",
        });
    }

    // if the confirmationTringNumber is greater than 10, return an error
    if (confirmationTringNumber > 10) {
        // add pending to user for 10 minutes
        await User.updateOne(
            { _id: UI },
            {pendingTime: Date.now() + 600000}
        );

        return res.status(400).json({
            success: false,
            message:
                "You have tried to many times please register again after 10 minutes",
        });
    }

    // if the confirmationNumber is not equal to the code, return an error
    if (confirmationNumber !== code) {
        // update the confirmationTringNumber by adding 1
        await User.updateOne(
            { _id: UI },
            { confirmationTringNumber: confirmationTringNumber + 1 }
        );
        return res.status(400).json({
            success: false,
            message: "The code is incorrect",
        });
    }

    // if the confirmationNumber is equal to the code, update the user and return a success message
    if (confirmationNumber === code) {
        await User.updateOne(
            { _id: UI },
            { confirmed: true, confirmationTringNumber: 0, confirmationNumber: "", confirmationNumberExpires: "" }
        );
        return res.status(200).json({
            success: true,
            message: "Your account has been verified",
        });
    }
});

export default handler;
