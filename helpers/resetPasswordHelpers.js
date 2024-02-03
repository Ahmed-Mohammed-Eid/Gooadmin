import User from "../Model/Users";
import { HashMyPassword } from "./Bcrypt_functions";


export async function ResetPassword(req, res) {
    const { newPassword, passwordConfirm, resetPasswordToken } = req.body;

    // Check if the reset password token is valid
    if (!resetPasswordToken) {
        return res.status(400).json({
            success: false,
            message: "Please Use the link sent to your email",
        });
    }

    // Check if the new password and the password confirmation are the same
    if (newPassword !== passwordConfirm) {
        return res.status(400).json({
            success: false,
            message:
                "The new password and the password confirmation are not the same",
        });
    }

    // Check if the new password is valid
    if (newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "The new password must be at least 8 characters long",
        });
    }

    // get the user id from the reset password token (the user id is between the UIUIUI and the UI)
    const userId = resetPasswordToken.split("UIUIUI")[1].split("UI")[0];
    // console.log(userId);

    // Check if the Token is valid in user and not expired
    const user = await User.findOne({
        _id: userId,
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
    });

    // Check if the user exists
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "The link is invalid or expired",
        });
    }

    // Hash the new password
    const hashedPassword = await HashMyPassword(newPassword);

    try {
        // Update the user password and reset the reset password token and the reset password token expiration date and the reset password tries
        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            resetPasswordTries: 0,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again",
        });
    }

    // return a message
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
}
