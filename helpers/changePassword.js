import User from "../Model/Users";
import {
    CompareMyPasswordWithTheHashedPassword,
    HashMyPassword,
} from "./Bcrypt_functions";

export async function changePassword(req, res) {
        // GET THE USER DATA FROM THE REQUEST
        const userData = req.userData;
        // Get the Email from the userData Obj
        const { email } = userData.user;

        // Check if the user exists and his role is admin
        const user = await User.findOne({ email: email });

        if (user) {
            // Get the old password from the request body
            const { oldPassword } = req.body;

            // Check if the old password is correct
            const isMatch = await CompareMyPasswordWithTheHashedPassword(
                oldPassword,
                user.password
            );

            // check if the old password is googleSignIn hashed
            const isGoogleSignIn = await CompareMyPasswordWithTheHashedPassword(
                "googleSignIn",
                user.password
            );

            if (isMatch || isGoogleSignIn) {
                //  check if the new password and the password confirmation are the same
                const { newPassword, passwordConfirm } = req.body;

                if (newPassword !== passwordConfirm) {
                    return res.status(400).json({
                        success: false,
                        error: "The new password and the password confirmation are not the same",
                    });
                }

                // Hash the new password
                const hashedPassword = await HashMyPassword(newPassword);

                // Update the user password
                User.findOneAndUpdate(
                    { email: email },
                    { password: hashedPassword },
                    (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                error: "Something went wrong while updating the user password",
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            message:
                                "The password has been changed successfully",
                        });
                    }
                );
            } else {
                return res.status(400).json({
                    success: false,
                    error: "The old password is not correct",
                });
            }
        }
}
