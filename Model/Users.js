import mongoose from "mongoose";
// Import the helper functions from helpers\Bcrypt_functions.js
import { HashMyPassword } from "../helpers/Bcrypt_functions.js";

const UserSchema = new mongoose.Schema({
    userImage: {
        type: {
            url: String,
            Img_Id: String,
        },
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        // Make a random username if the user doesn't provide one and make sure it's unique
        default: function () {
            return Math.random().toString(36).substring(7);
        },
        validate: [
            {
                //  check username with regex to make sure it is valid
                validator: function (v) {
                    return /^[a-zA-Z0-9_\.]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid username!`,
            },
        ],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    },
    role: {
        type: String,
        default: "user",
    },

    // Account Settings
    confirmationNumber: {
        type: String,
    },
    confirmationNumberExpires: {
        type: Date,
    },
    confirmationTringNumber: {
        type: Number,
        default: 0,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    pendingTime: {
        type: Date,
    },
    resendCodeNumber: {
        type: Number,
        default: 0,
    },
    resendCodePendingTime: {
        type: Date,
    },
    // The Reset Password Token
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    resetPasswordTries: {
        type: Number,
        default: 0,
    },
    resetPasswordTokenPendingTime: {
        type: Date,
    },
    // Date of creation
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the Password before saving the user
UserSchema.pre("save", async function (next) {
    try {
        this.password = await HashMyPassword(this.password);
        next();
    } catch (error) {
        // If there is an error, stop saving the user
        next(error);
    }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

/*
[1]: create a user on db and return it's id
[2]: create a confirmation number and return it
[3]: create a confirmation number expiration date and return it
[4]: when the user click confirm number if true make it's confirmed and continue to next step else return error and add 1 to confirmationTringNumber
[5]: if user signed up with google add it's data to the user and make it's confirmed true
*/
