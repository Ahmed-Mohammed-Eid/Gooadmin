import React, {useRef, useState} from "react";
import classes from "../../styles/authentication/changePassword.module.scss";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
// Authentication functionality
import {useRouter} from "next/router";
// Notifications
import {toast} from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";
import WarningIcon from "../../components/layout/WarningIcon/WarningIcon";
// Authentication Helpers
import {verifyToken} from "../../helpers/Authentication_helpers";

function changePassword() {
    // init Router
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);

    // References
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const passwordConfirmRef = useRef();

    // Handle the submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        //  check if any of the fields is empty
        if (
            oldPasswordRef.current.value === "" ||
            newPasswordRef.current.value === "" ||
            passwordConfirmRef.current.value === ""
        ) {
            return toast.error("Please fill all the fields");
        }

        //  check if the new password and the password confirmation are the same
        if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
            return toast.error(
                "The new password and the password confirmation are not the same"
            );
        }

        // Show the spinner
        setLoading(true);

        // Send the request
        try {
            const dataObject = {
                oldPassword: oldPasswordRef.current.value,
                newPassword: newPasswordRef.current.value,
                passwordConfirm: passwordConfirmRef.current.value,
            };

            const {data} = await axios.put(
                "/api/user/change_Password",
                dataObject
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            // Hide the spinner
            setLoading(false);

            // Clear the fields
            oldPasswordRef.current.value = "";
            newPasswordRef.current.value = "";
            passwordConfirmRef.current.value = "";

            // Redirect the user to the home page
            router.push("/");
        } catch (error) {
            // Hide the spinner
            setLoading(false);
            toast.error(error.response.data.error);
        }
    };

    return (
        <>
            <Head>
                <title>Change Password</title>
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
                                <h1>Change Password</h1>
                                <div className={classes.Note}>
                                    <WarningIcon/>
                                    <p>
                                        If you signed in with google, this is your
                                        first time to change your password, use the
                                        password{" "}
                                        <span className='highlighted'>
                                        "googleSignIn"
                                    </span>{" "}
                                        as your old password.
                                    </p>
                                </div>

                                <div className={classes.Input_Container}>
                                    <input
                                        type='password'
                                        name='oldPassword'
                                        placeholder=' '
                                        id='oldPassword'
                                        ref={oldPasswordRef}
                                    />
                                    <label htmlFor='oldPassword'>
                                        Old Password
                                    </label>
                                </div>
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
                                            `Update Password`
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

export default changePassword;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({req, res}) => {
    // Authentication check
    const data = verifyToken(req);

    if (!data || !data?.user) {
        // User is not authenticated, redirect to login page
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
