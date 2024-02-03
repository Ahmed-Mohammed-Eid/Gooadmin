import React, {useRef, useState} from "react";
import classes from "../../styles/authentication/resetPassword_p1.module.scss";
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

function resetPassword() {
    // init Router
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);

    // References
    const emailRef = useRef();

    // Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email
        const email = emailRef.current.value;

        // Check if the email is valid
        if (!email) {
            toast.error("Please provide an email");
            return;
        }

        // Check if the email is valid (regex)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please provide a valid email");
            return;
        }

        // Show the spinner
        setLoading(true);

        // Send the request to the server
        try {
            const {data} = await axios.post("/api/user/changePasswordLink", {email});

            // Check if data success is true and notify the user
            if (data.success) {
                toast.success(data.message);
                // Redirect the user to the login page
                router.push("/");
            }

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
                                        type='email'
                                        name='resetemail'
                                        placeholder=' '
                                        id='resetemail'
                                        required
                                        ref={emailRef}
                                    />
                                    <label htmlFor='resetemail'>
                                        Email
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
                                            `Send`
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

export default resetPassword;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Authentication check
    const data = verifyToken(ctx.req);

    if (data) {
        // User is not authenticated, redirect to login page
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
