import React, {useRef, useState} from "react";
import Head from "next/head";
import classes from '../../../../styles/create_course.module.scss';
import {useRouter} from "next/router";
// IMPORTS
import MainImage from "../../../../components/Pages/createProject/mainImage/mainImage";
import SendIcon from "../../../../components/layout/ImagesIcons/SendIcon";
import Spinner from "../../../../components/layout/Spinner";
// IMPORTS (FUNCTIONS)
import {toast} from "react-toastify";
import axios from "axios";
import {UploadImageToCloudinary} from "../../../../redux/actions/createProjectActions";
import {useDispatch} from "react-redux";
// Authentication Helpers
import {verifyToken} from "../../../../helpers/Authentication_helpers";
// GET THE DOMAIN
import absoluteUrl from 'next-absolute-url';

const Edit_course = ({ID, result}) => {
    // ROUTER
    const router = useRouter();
    // REDUX
    const dispatch = useDispatch();
    // States
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    // REFS
    const titleRef = useRef();
    const linkRef = useRef();
    const descriptionRef = useRef();

    // Functions
    const getMainImageFromComponent = (mainImage) => {
        setImage(mainImage);
    };

    const createHandler = async (event) => {
        //STOP RELOADING
        event.preventDefault();
        // GET THE POST ID and Check it for Update or return
        // GET THE FORM DATA
        const title = titleRef.current.value;
        const link = linkRef.current.value;
        const description = descriptionRef.current.value;
        // CHECK IF THE FORM DATA IS VALID
        if (!title || title === null || title === undefined || title === '') {
            toast.error('Please Enter a valid title 😢')
            return;
        }
        if (!link || link === null || link === undefined || link === '') {
            toast.error('Please Enter a valid playlist link 😢')
            return;
        }
        if (!description || description === null || description === undefined || description === '') {
            toast.error('Please Enter a valid Description 😢')
            return;
        }
        //SET THE LOADING STATE
        setLoading(true)

        // course data Object
        let updateObject = {
            title,
            description,
            youtubeLink: link,
        };
        if (image) {
            // Uploading IMage and get res data in variables
            const {
                payload: {
                    data: {
                        secure_url: mainImgURL,
                    },
                },
            } = await dispatch(
                UploadImageToCloudinary({
                    ImageFile: image,
                    Save_Method_And_Place: "AMB_Courses",
                })
            );
            //Set the Image url
            updateObject = {...updateObject, imageUrl: mainImgURL}
        }
        //SEND THE POST REQUEST
        let result;
        try {
            await axios.put(`/api/course/editCourseApi?ID=${ID}`, updateObject).then(res => {
                setLoading(false)
                toast.success(res.data.message)
                // Redirect to Courses Page
                router.push('/user/courses')
                return res
            });
        } catch (e) {
            setLoading(false)
            console.log(e);
            return;
        }
    }


    return (
        <>
            <Head>
                <title>Edit Course</title>
            </Head>
            <div className={'container min-vh-full py-6'}>
                <form className={classes.Form_Container} title={'Edit Course'}>
                    <MainImage text={'COURSE NEW IMAGE'} getMainImage={getMainImageFromComponent}/>
                    <input type={'text'} placeholder={'Title...'} ref={titleRef} defaultValue={result.title}/>
                    <input type={'text'} placeholder={'Youtube Link...'} ref={linkRef}
                           defaultValue={result.youtubeLink}/>
                    <textarea placeholder={'Description'} defaultValue={result.description}
                              ref={descriptionRef}></textarea>
                    <button onClick={createHandler}>
                        <span>
                            <SendIcon/>
                        </span>
                        <span>{loading ? <Spinner color={'#ff5500'} size={2}/> : 'Edit'}</span>
                    </button>
                </form>
            </div>
        </>
    )
}

export default Edit_course;


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Authentication check
    const {user} = verifyToken(ctx.req);
    // Redirect if there is no user id in the token
    if (!user || !user._id) {
        // User is not authenticated, redirect to login page
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    //# GET THE ID FROM THE REQUEST TO PASS TO THE PAGE PROPS
    const ID = ctx.query.ID;
    // Redirect if there is no course id in the url
    if (!ID) {
        // User is not authenticated, redirect to login page
        return {
            redirect: {
                destination: "/user/courses",
                permanent: false,
            },
        };
    }

    // URL LINK
    const {origin} = absoluteUrl(ctx.req)
    // # GET THE COURSE DATA FROM THE SERVER BASED ON THE ID
    const result = await axios.get(`${origin}/api/course/get_course?ID=${ID}`)
        .then(res => {
            return res.data.course
        })
        .catch(e => console.log(e))

    if (!result) {
        return {
            redirect: {
                destination: "/user/courses",
                permanent: false,
            },
        };
    }

    return {
        props: {ID, result},
    };
};
