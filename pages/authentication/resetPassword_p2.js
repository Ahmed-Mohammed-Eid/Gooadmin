import React, {useRef, useState} from "react";
import classes from "../../styles/authentication/resetPassword_p2.module.scss";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/router";
// Notifications
import {toast} from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";
// Authentication Helpers
import {verifyToken} from "../../helpers/Authentication_helpers";

function ResetPassword() {
    // init Router
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);

    // References
    const newPasswordRef = useRef();
    const passwordConfirmRef = useRef();

    // Handle the submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from the url
        const token = router.query.token;

        // Get the new password and the password confirmation
        const newPassword = newPasswordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        // Check if the new password is valid
        if (!newPassword) {
            toast.error("Please provide a new password");
            return;
        }

        // Check if the new password is 8 characters long or more
        if (newPassword.length < 8) {
            toast.error("The new password must be at least 8 characters long");
            return;
        }

        // Check if the password confirmation is valid
        if (!passwordConfirm) {
            toast.error("Please provide the password confirmation");
            return;
        }

        // Check if the password confirmation is the same as the new password
        if (newPassword !== passwordConfirm) {
            toast.error(
                "The password confirmation doesn't match the new password"
            );
            return;
        }

        // Show the spinner
        setLoading(true);

        // Send the request to the server
        try {
            const {data} = await axios.put("/api/user/reset_Password", {
                resetPasswordToken: token,
                newPassword,
                passwordConfirm,
            });

            // Check if data success is true and notify the user
            if (data.success) {
                toast.success(data.message);
                // Redirect the user to the login page
                router.push("/authentication/login");
            }

            // Hide the spinner
            setLoading(false);
        } catch (error) {
            // Hide the spinner
            setLoading(false);
            // Notify the user
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Head>
                <title>Reset Password</title>
            </Head>
            <div className='container'>
                <div className={classes.Content_Container}>
                    <div className={classes.Content}>
                        <section className={classes.Left_Section}>
                            <div className={classes.Image_Container}>
                                <Image
                                    src='/Images/Auth/signup_2.png'
                                    alt='signup illustration'
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </div>
                        </section>
                        <section className={classes.Right_Section}>
                            <form onSubmit={handleSubmit}>
                                <h1>Reset Password</h1>

                                <div className={classes.Input_Container}>
                                    <input
                                        type='password'
                                        name='newPassword'
                                        placeholder=' '
                                        id='newPassword'
                                        ref={newPasswordRef}
                                    />
                                    <label htmlFor='newPassword'>
                                        New Password
                                    </label>
                                </div>
                                <div className={classes.Input_Container}>
                                    <input
                                        type='password'
                                        name='passwordConfirm'
                                        placeholder=' '
                                        id='passwordConfirm'
                                        ref={passwordConfirmRef}
                                    />
                                    <label htmlFor='passwordConfirm'>
                                        Password Confirm
                                    </label>
                                </div>
                                <div className={classes.Signup_Buttons_Container}>
                                    <button
                                        className={classes.Signup_Button}
                                        type='submit'
                                    >
                                        {loading ? (
                                            <Spinner size={2} color={`#ffffff`}/>
                                        ) : (
                                            `Confirm`
                                        )}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps = async (ctx) => {
//     // Authentication check
//     const data = verifyToken(ctx.req);
//
//     if (data) {
//         // User is not authenticated, redirect to login page
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }
//
//     return {
//         props: {},
//     };
// };
