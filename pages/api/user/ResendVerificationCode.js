import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

// Helpers
import SendAMB_Email from "../../../config/sendInBlue";
import { createRandomNumber } from "../../../helpers/createRandomNumber";
// Model
import User from "../../../Model/Users";

const handler = nc();
dbConnect();

handler.post(async (req, res) => {
    const { UI, UE } = req.body;

    // Check if the user exists
    const user = await User.findOne({ _id: UI, email: UE });

    // check if the user exists and the connfirmationTringNumber is greater than 10 send an error message of new registration
    if (user && user.confirmationTringNumber > 10) {
        return res.status(400).json({
            success: false,
            message:
                "You have tried to many times please register again after 10 minutes",
        });
    }

    // check if the user exists and the resendCodePendingTime is greater than the current time send an error message of new registration & reset the resendCodePendingNumber
    if (user && user.resendCodePendingTime > Date.now()) {
        // reset the resendCodePendingNumber
        await User.updateOne({ _id: UI }, { resendCodeNumber: 0 });

        return res.status(400).json({
            success: false,
            message: "Please wait 10 minutes before trying again",
        });
    }

    // check if the user exists and the resendCodeNumber is greater than 5 send an error message of new registration
    if (user && user.resendCodeNumber > 5) {
        return res.status(400).json({
            success: false,
            message:
                "You have tried to many times please wait 10 minutes before trying again",
        });
    };

    // if user is exists and not confirmed send a new code
    if (user && !user.confirmed) {
        // Create a random number with 6 digits for confirmation
        const confirmationNumber = createRandomNumber(6);

        // Send Email
        SendAMB_Email(UE, user.firstName, user.lastName, confirmationNumber);

        // update the user with the new confirmationNumber and confirmationNumberExpires
        await User.updateOne(
            { _id: UI },
            {
                confirmationNumber: confirmationNumber,
                confirmationNumberExpires: Date.now() + 3600000, // 1 hour
                resendCodeNumber: user.resendCodeNumber + 1,
            }
        );

        return res.status(201).json({
            success: true,
            message: "A new code has been sent to your email",
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "User does not exists",
        });
    }
});

export default handler;
