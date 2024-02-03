import React, {useRef, useState} from "react";
import Head from "next/head";
import classes from '../../styles/create_course.module.scss';
import {useRouter} from "next/router";
// IMPORTS
import MainImage from "../../components/Pages/createProject/mainImage/mainImage";
import SendIcon from "../../components/layout/ImagesIcons/SendIcon";
import Spinner from "../../components/layout/Spinner";
// IMPORTS (FUNCTIONS)
import {toast} from "react-toastify";
import axios from "axios";
import {UploadImageToCloudinary} from "../../redux/actions/createProjectActions";
import {useDispatch} from "react-redux";
// Authentication Check
import {verifyToken} from "../../helpers/Authentication_helpers";

const Create_course = () => {
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
        // GET THE FORM DATA
        const title = titleRef.current.value;
        const link = linkRef.current.value;
        const description = descriptionRef.current.value;
        // CHECK IF THE FORM DATA IS VALID
        if (!image || image === '') {
            toast.error('Please Choose a valid Image 😢')
            return;
        }
        if (!title || title === '') {
            toast.error('Please Enter a valid title 😢')
            return;
        }
        if (!link ||link === '') {
            toast.error('Please Enter a valid playlist link 😢')
            return;
        }
        if (!description || description === '') {
            toast.error('Please Enter a valid Description 😢')
            return;
        }
        //SET THE LOADING STATE
        setLoading(true)
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
        //SEND THE POST REQUEST
        try {
            await axios.post(`/api/course/createCourseApi`, {
                title,
                imageUrl: mainImgURL,
                description,
                youtubeLink: link,
            }).then(res => {
                setLoading(false)
                toast.success(res.data.message)
                // Clear the Inputs
                titleRef.current.value = '';
                linkRef.current.value = '';
                descriptionRef.current.value = '';
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
                <title>Create Course</title>
            </Head>
            <div className={'container min-vh-full py-6'}>
                <form className={classes.Form_Container} title={'Create Course'}>
                    <MainImage text={'COURSE IMAGE'} getMainImage={getMainImageFromComponent}/>
                    <input type={'text'} placeholder={'Title...'} ref={titleRef}/>
                    <input type={'text'} placeholder={'Youtube Link...'} ref={linkRef}/>
                    <textarea placeholder={'Description'} ref={descriptionRef}></textarea>
                    <button onClick={createHandler}>
                        <span>
                            <SendIcon/>
                        </span>
                        <span>{loading ? <Spinner color={'#ff5500'} size={2}/> : 'Create'}</span>
                    </button>
                </form>
            </div>
        </>
    )
}

export default Create_course;

export const getServerSideProps = async (ctx) => {
    // Check Authentication
    const { user } = verifyToken(ctx.req);
    // Check if the user is existed and the role is admin
    if(!user || user?.role !== 'admin'){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
};