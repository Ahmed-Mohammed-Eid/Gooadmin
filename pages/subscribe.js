import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import classes from "../styles/contact.module.scss";

import Image from "next/image";
import SendIcon from "../components/layout/ImagesIcons/SendIcon";
import Spinner from "../components/layout/Spinner";
import Courses from "../components/layout/CoursesSelect/CoursesSelect";
import CircleImageAnimation from "../components/layout/CircleAnimation/CircleImageAnimation";
// Helpers
import { toast } from "react-toastify";
import axios from "axios";

const Subscribe = ({courses}) => {

    console.log(courses);
    // ROUTER
    const router = useRouter();

    // The Ref of the form fields
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const levelRef = useRef();
    // STATES
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [coursePreview, setCoursePreview] = useState(null); // [name, price, text]

    //  The State of Sending the form
    const [sending, setSending] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const level = levelRef.current.value;

        if (!name || !email || !phone || !selectedCourse || !level) {
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
        axios
            .post(
                "/api/course/subscripInCourse",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        USER_NAME: name,
                        TELE: phone,
                        EMAIL: email,
                        COURSE: selectedCourse,
                        PRICE: coursePreview?.price,
                        LEVELS: level,
                    },
                }
            )
            .then((_) => {
                setSending(false);

                router.push("/").then(() => {
                    toast.success("Your request has been sent successfully");
                });
            })
            .catch((err) => {
                toast.error("Something went wrong");
                console.log(err);
                setSending(false);
            });
    };

    useEffect(() => {
        if (selectedCourse) {
            const course = courses.find(
                (course) => course.name === selectedCourse
            );
            setCoursePreview(course);
        }
    }, [selectedCourse]);

    return (
        <>
            <Head>
                <title>GooAdmin || Subscribe at courses</title>
                <meta
                    name="description"
                    content="GooAdmin is a software development education platform that offers a variety of courses on different topics. Subscribe today and start learning!"
                />
                <meta
                    name="keywords"
                    content="contact, gooadmin, software development, education services, courses, learning"
                />
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <div
                        className={[classes.Left, classes.LEFTCOURSES].join(
                            " "
                        )}
                    >
                        <CircleImageAnimation />
                    </div>
                    <div className={classes.Right}>
                        <div className={classes.Form_Container}>
                            <form onSubmit={submitHandler}>
                                <div className={classes.Input_Container}>
                                    {coursePreview && (<div className={classes.CourseContainer}>
                                        <div className={classes.HeaderAndPrice}>
                                            <h3>{coursePreview?.name}</h3>
                                            <span>{coursePreview?.price} EGP</span>
                                        </div>
                                        <p>
                                            {coursePreview?.message}
                                        </p>
                                    </div>)}
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
                                            type="text"
                                            placeholder={"Name"}
                                            ref={nameRef}
                                        />
                                    </div>
                                    <div className={classes.Input_Icon}>
                                        <div className={classes.Icon}>
                                            <Image
                                                src={"/Images/icons/mobile.svg"}
                                                width={24}
                                                height={24}
                                                alt={"Icon"}
                                            />
                                        </div>
                                        <input
                                            className={classes.Input}
                                            type="tel"
                                            placeholder={"Phone"}
                                            ref={phoneRef}
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
                                            type="email"
                                            placeholder={"Email"}
                                            ref={emailRef}
                                        />
                                    </div>
                                    <div className={classes.Input_Icon}>
                                        <Courses
                                            courses={courses}
                                            changeEvent={(value) =>
                                                setSelectedCourse(value)
                                            }
                                        />
                                    </div>
                                    <div className={classes.Input_Icon}>
                                        <select
                                            className={classes.Input}
                                            name="levels"
                                            id="levels"
                                            ref={levelRef}
                                        >
                                            <option value="Beginner">
                                                Beginner
                                            </option>
                                            <option value="Below Intermediate">
                                                Below Intermediate
                                            </option>
                                            <option value="Intermediate">
                                                Intermediate
                                            </option>
                                            <option value="Above Intermediate">
                                                Above Intermediate
                                            </option>
                                            <option value="Expert">
                                                Expert
                                            </option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className={classes.Button}
                                    >
                                        {sending ? (
                                            <Spinner
                                                size={3}
                                                color={"#ffffff"}
                                            />
                                        ) : (
                                            <>
                                                {" "}
                                                <SendIcon /> Send
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscribe;

export async function getServerSideProps(_) {
    // GET THE COURSES
    const courses = await axios.get(`http://185.217.125.44:1310/ords/goo/course/course`)
        .then(res => {
            return res.data.items;
        })
        .catch(err => {
            console.log(err);
            return [];
        });

    return {
        props: {
            courses
        },
    };
}