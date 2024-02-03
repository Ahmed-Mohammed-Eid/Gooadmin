import { useRef, useState } from "react";
import Head from "next/head";

import classes from "../styles/contact.module.scss";

import Image from "next/image";
import SendIcon from "../components/layout/ImagesIcons/SendIcon";
import SocialMediaIcon from "../components/Pages/about/SocialMediaIcon";
import Spinner from "../components/layout/Spinner";
// Helpers
import { toast } from "react-toastify";
import axios from "axios";

const contact = () => {
    // The Ref of the form fields
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    //  The State of Sending the form
    const [sending, setSending] = useState(false);

    const sendTheMessageHandler = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        if (!name || !email || !message) {
            toast.error("Please fill all fields");
            return;
        }

        // check if the email is valid
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            toast.error("Please Enter a valid email");
            return;
        }

        // set the state of sending to true
        setSending(true);

        // Send the message to the server
        const res = await axios.post("/api/contact", {
            name,
            email,
            message,
        });

        if (res.status === 201) {
            toast.success("Message has Sended!");
            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";
            // set the sending state to false
            setSending(false);
        } else {
            toast.error("Something went wrong!");
            // set the sending state to false
            setSending(false);
        }
    };

    return (
        <>
            <Head>
                <title>Contact GooAdmin</title>
                <meta name="description" content="Get in touch with GooAdmin to learn more about our services or to inquire about a quote."/>
                <meta name="keywords" content="contact, gooadmin, software development, education services"/>
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <div className={classes.Left}>
                        <p>
                            I Am More Than Happy To Contact With You Just Choose
                            The Comfortable Way For You
                        </p>
                        <div className={classes.Image_Container}>
                            <Image
                                src={"/Images/118.svg"}
                                width={500}
                                height={340}
                                alt={"Contact Image"}
                            />
                        </div>
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Form_Container}>
                            <form onSubmit={sendTheMessageHandler}>
                                <div className={classes.Input_Container}>
                                    <div className={classes.Input_Icon}>
                                        <div className={classes.Icon}>
                                            <Image
                                                src={
                                                    "/Images/icons/UserNameIcon.svg"
                                                }
                                                width={20}
                                                height={20}
                                                alt={"Icon"}
                                            />
                                        </div>
                                        <input
                                            className={classes.Input}
                                            type='text'
                                            placeholder={"Name"}
                                            ref={nameRef}
                                        />
                                    </div>
                                    <div className={classes.Input_Icon}>
                                        <div className={classes.Icon}>
                                            <Image
                                                src={
                                                    "/Images/icons/EmailIcon.svg"
                                                }
                                                width={24}
                                                height={24}
                                                alt={"Icon"}
                                            />
                                        </div>
                                        <input
                                            className={classes.Input}
                                            type='email'
                                            placeholder={"Email"}
                                            ref={emailRef}
                                        />
                                    </div>
                                    <textarea
                                        className={classes.TextArea}
                                        name=''
                                        id=''
                                        cols='30'
                                        rows='10'
                                        placeholder={"Message"}
                                        ref={messageRef}
                                    />
                                    <button
                                        type='submit'
                                        className={classes.Button}
                                    >
                                        {sending ? <Spinner size={3} color={'#ffffff'} /> : <> <SendIcon /> Send</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/*Icons Container*/}
                        <div className={classes.Icons_Container}>
                            <SocialMediaIcon
                                accountLink={
                                    "https://www.facebook.com/profile.php?id=100076252754626"
                                }
                                icon={"/Images/icons/About_Fb.svg"}
                                iconAlt={"Facebook account link"}
                            />
                            <SocialMediaIcon
                                accountLink={
                                    "https://twitter.com/Hossam_Asadalla"
                                }
                                icon={"/Images/icons/About_Tw.svg"}
                                iconAlt={"Twitter account link"}
                            />
                            <SocialMediaIcon
                                accountLink={"https://wa.me/201270358999"}
                                icon={"/Images/icons/About_Wp.svg"}
                                iconAlt={"Whatsapp account link"}
                            />
                            <SocialMediaIcon
                                accountLink={"https://t.me/hossamassadallall"}
                                icon={"/Images/icons/About_Tg.svg"}
                                iconAlt={"Telegram account link"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default contact;
