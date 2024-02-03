import React, {useRef, useEffect, useState} from "react";
import classes from "../../styles/authentication/verificationCode.module.scss";
import Head from "next/head";
// IMPORTS
import {useRouter} from "next/router";
import Image from "next/image";
import Spinner from "../../components/layout/Spinner";
// redux
import {useSelector} from "react-redux";
import axios from "axios";

// notifiers
import {toast} from "react-toastify";
// Authentication Helpers
import {verifyToken} from "../../helpers/Authentication_helpers";

function verificationCode() {
    // init router
    const router = useRouter();

    // init states
    const [loading, setLoading] = useState(false);

    //  get the email and id from the redux store
    const {UI, UE} = useSelector((state) => state.registeration);

    // get the email and id from the local storage
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        // get the email and id from the local storage
        const email = localStorage.getItem("userEmail");
        const id = localStorage.getItem("userId");

        // set the email and id in the state
        setEmail(email);
        setId(id);
    }, []);

    // References from the inputs
    const number1Ref = useRef();
    const number2Ref = useRef();
    const number3Ref = useRef();
    const number4Ref = useRef();
    const number5Ref = useRef();
    const number6Ref = useRef();

    /*
    function for making the input max number of characters 1 and only numbers are allowed and every input has id of number1, number2, number3, number4, number5, number6
    and the input is focused on the next input when the current input has a value and the input is focused on the previous input when the current input is empty and the backspace key is pressed
    
    */
    function handleInput(e) {
        const input = e.target;
        const id = input.id;
        const value = input.value;
        const number = id.replace("number", "");
        const nextNumber = parseInt(number) + 1;
        const previousNumber = parseInt(number) - 1;
        if (value.length > 1) {
            input.value = value.slice(0, 1);
        }
        if (value.length === 1) {
            if (nextNumber <= 6) {
                document.getElementById(`number${nextNumber}`).focus();
            } else {
                document.getElementById(`number${number}`).blur();
            }
        }
        if (value.length === 0) {
            if (previousNumber >= 1) {
                document.getElementById(`number${previousNumber}`).focus();
            }
        }
    }

    // handle submit
    async function handleSubmit(e) {
        e.preventDefault();
        // Get the code from the inputs and join them together
        const code = [
            number1Ref.current.value,
            number2Ref.current.value,
            number3Ref.current.value,
            number4Ref.current.value,
            number5Ref.current.value,
            number6Ref.current.value,
        ].join("");

        // Check if the code is 6 characters long
        if (code.length !== 6 || isNaN(+code)) {
            return toast.error("Please enter a valid code");
        }

        // Send request to verify the code
        axios
            .post("/api/user/verifyAccount", {
                code,
                UI: UI || id,
                UE: UE || email,
            })
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    // remove the email and id from the local storage
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userId");
                    // redirect to the login page
                    router.push(`/authentication/login`);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    // Resend the code to the email address if the user didn't receive the code
    async function resendCode() {
        if (!UI || !UE) {
            return toast.error(
                "Something went wrong with your data please register again without refreshing the page"
            );
        }
        axios
            .post("/api/user/ResendVerificationCode", {UI, UE})
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    return (
        <>
            <Head>
                <title>Verify Code</title>
            </Head>
            <div className='container'>
                <div className={classes.Content_Container}>
                    <div className={classes.Content}>
                        <section className={classes.Left_Section}>
                            <div className={classes.Image_Container}>
                                <Image
                                    src='/Images/Auth/VerificationCode.png'
                                    alt='signup illustration'
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </div>
                        </section>
                        <section className={classes.Right_Section}>
                            <form onSubmit={handleSubmit}>
                                <h1>Verification Code</h1>
                                <p>
                                    you will receive a code in a message on
                                    <span className='highlighted'>
                                    {" "}
                                        {UE ? UE : "Your email"}
                                </span>
                                    . please check your inbox or Junk.
                                </p>
                                <button
                                    onClick={resendCode}
                                    type='Button'
                                    className={classes.ResendButton}
                                >
                                    Resend Code
                                </button>
                                <div className={classes.Inputs_Container}>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number1'
                                            id='number1'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number1Ref}
                                        />
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number2'
                                            id='number2'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number2Ref}
                                        />
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number3'
                                            id='number3'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number3Ref}
                                        />
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number4'
                                            id='number4'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number4Ref}
                                        />
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number5'
                                            id='number5'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number5Ref}
                                        />
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <input
                                            type='number'
                                            name='number6'
                                            id='number6'
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onInput={handleInput}
                                            ref={number6Ref}
                                        />
                                    </div>
                                </div>
                                <button className={classes.Button} type='submit'>
                                    {loading ? <Spinner size={2} color={`#ffffff`}/> : `Verify`}
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default verificationCode;

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

