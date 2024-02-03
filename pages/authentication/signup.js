import React, {useRef, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classes from "../../styles/authentication/signup.module.scss";
// Axios
import axios from "axios";
// Import notifiers
import {toast} from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";
// Router
import {useRouter} from "next/router";
// Redux
import {setU_Info} from "../../redux/slices/registrationSlice";
import {useDispatch} from "react-redux";
import {verifyToken} from "../../helpers/Authentication_helpers";

function signup() {
    // init router
    const router = useRouter();

    // init dispatch
    const dispatch = useDispatch();

    // States
    const [loading, setLoading] = useState(false);

    // References
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        // Values
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // Check if Email is Valid email address with regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please provide a valid email address");
        }

        // Check if Passwords match
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        // Check if Password is at least 6 characters long
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

        // Set loading to true
        setLoading(true);

        // Send request to create user
        axios
            .post("/api/user/create_user", {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            })
            .then((res) => {
                // Set the user email and id in const
                const {userId, email} = res.data;

                // Clear the form
                firstNameRef.current.value = "";
                lastNameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                confirmPasswordRef.current.value = "";

                // Set the user info in the redux store
                dispatch(setU_Info({UI: userId, UE: email}));

                // Add the user id and user email to local storage
                localStorage.setItem("userId", userId);
                localStorage.setItem("userEmail", email);

                // Set loading to false
                setLoading(false);

                // Redirect to Confirmation Page with the user id in the query string
                router.push(
                    `/authentication/verificationCode?ui=${userId}&ue=${email}`
                );

                // Notify user that his account has been created and need to be confirmed
                toast.success(
                    "Your account has been created. Please confirm your email address"
                );
            })
            .catch((err) => {
                // Set loading to false
                setLoading(false);

                toast.error(err.response.data.message);
            });
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
                <title>Signup</title>
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
                                <h1>Signup</h1>
                                <div className={classes.Inputs_Container}>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='firstName'
                                            name='firstName'
                                            id='firstName'
                                            placeholder=' '
                                            ref={firstNameRef}
                                        />
                                        <label htmlFor='firstName'>
                                            First Name
                                        </label>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='lastName'
                                            name='lastName'
                                            id='lastName'
                                            placeholder=' '
                                            ref={lastNameRef}
                                        />
                                        <label htmlFor='lastName'>Last Name</label>
                                    </div>
                                </div>
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
                                <div className={classes.Input_Container}>
                                    <input
                                        type='password'
                                        name='confirmPassword'
                                        placeholder=' '
                                        id='confirmPassword'
                                        ref={confirmPasswordRef}
                                    />
                                    <label htmlFor='confirmPassword'>
                                        Confirm Password
                                    </label>
                                </div>
                                <div className={classes.Signup_Buttons_Container}>
                                    <button
                                        className={classes.Signup_Button}
                                        type='submit'
                                    >
                                        {loading ? (
                                            <Spinner size={2} color={"#ffffff"}/>
                                        ) : (
                                            `Signup`
                                        )}
                                    </button>
                                    <a
                                        href='/api/auth/google'
                                        className={classes.Google_Signup}
                                        onClick={handleGoogle}
                                    >
                                        <Image
                                            src='/Images/icons/google.png'
                                            alt='google logo'
                                            width={20}
                                            height={20}
                                        />
                                    </a>
                                </div>
                                <Link href='/authentication/login'>
                                    <a>Already have an account? Login</a>
                                </Link>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default signup;

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
