import React, {useRef, useState} from "react";
import classes from "../../styles/authentication/login.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// Authentication functionality
import {useRouter} from "next/router";
// Notifications
import {toast} from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";
import axios from "axios";
// Authentication Helper
import {verifyToken} from "../../helpers/Authentication_helpers";

function login() {
    // init Router
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);

    // References
    const emailRef = useRef();
    const passwordRef = useRef();

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        // Values
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Check if Email is Valid email address with regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please provide a valid email address");
        }

        // Check if Password is at least 6 characters long
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

        // Set loading to true
        setLoading(true);

        // Sign in
        await axios.post("/api/auth/credentials", {
            email,
            password,
        }).then(res => {
            if (res?.data?.success && res?.data?.token) {
                router.push(`/?token=${res.data.token}`);
                toast.success("You have successfully logged in");
                // Set loading to false
                setLoading(false);
            }
        })
            .catch(err => {
                toast.error(err?.response?.data?.message || err.message);

                // Set loading to false
                setLoading(false);

            })
    }

    // Google login
    async function handleGoogle(e) {
        // Send a request to google API
        const response = await axios.get(`/api/auth/google`);
        // console.log(response);
        // check if the url is exist
        if (response?.data?.url) {
            window.location.href = response.data.url;
        } else {
            toast.error("No Login Url found please call the Support team");
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
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
                                <h1>Login</h1>
                                <div className={classes.Input_Container}>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder=' '
                                        ref={emailRef}
                                    />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className={classes.Input_Container}>
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder=' '
                                        id='password'
                                        ref={passwordRef}
                                    />
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <div className={classes.Signup_Buttons_Container}>
                                    <button
                                        className={classes.Signup_Button}
                                        type='submit'
                                    >
                                        {loading ? (
                                            <Spinner size={2} color={`#ffffff`}/>
                                        ) : (
                                            `Login`
                                        )}
                                    </button>
                                    <a
                                        href='/api/auth/signin'
                                        className={classes.Google_Signup}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Google
                                            handleGoogle(e);
                                        }}
                                    >
                                        <Image
                                            src='/Images/icons/google.png'
                                            alt='google logo'
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                </div>
                                <Link href='/authentication/signup'>
                                    <a>Don't have an account? Register</a>
                                </Link>
                                <Link href='/authentication/resetPassword_p1'>
                                    <a>Forgot Password</a>
                                </Link>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default login;

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
