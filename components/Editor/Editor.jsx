import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// Spinner
import Spinner from "../layout/Spinner";
// #############################################################################
// Create Editor
// #############################################################################
import {createReactEditorJS} from "react-editor-js";
import editorConfig from "../../helpers/EditorConfig";
// #############################################################################
// Axios
// #############################################################################
import axios from "axios";
// Create the Editor
const ReactEditorJS = createReactEditorJS();
//######## Redux
import {useDispatch, useSelector} from "react-redux";
import {onPending, OnSuccess, onError} from "../../redux/slices/createPostSlice";
import {createPost} from "../../redux/actions/createPostActions";
//######## Upload the Image
import {UploadImageToCloudinary} from "../../redux/actions/createProjectActions";
//######### Custom style for the Editor
import classes from "./EditorElementsStyle.module.scss";


// Editor Component
function Editor({mainImage, ID}) {
    // Router
    const router = useRouter();
    //Initialize Redux
    const dispatch = useDispatch()
    const {
        heading,
        categories,
        checked
    } = useSelector(state => state.createPost)

    // Make a ref for the Editor to be able to save
    const editorJS = React.useRef(null);
    const [sending, setSending] = useState(false);

    // Set up the ref on the Editor
    const handleInitialize = React.useCallback((instance) => {
        editorJS.current = instance;
    }, []);

    // Save Data in DB
    const handleSave = React.useCallback(async (theImg, header, categories) => {
        const savedData = await editorJS.current.save();

        //Check If there is an Image to Upload and Create the Post
        if (theImg && header && categories && checked && savedData) {
            //NOTIFICATION
            dispatch(onPending({value: "We are Uploading the Image 😊"}))

            //Change Btn Text
            setSending(true)
            // Uploading Main IMage and get res data in variables
            const res = await dispatch(
                UploadImageToCloudinary({
                    ImageFile: theImg,
                    Save_Method_And_Place: "AMB_BLOG",
                })
            );

            // check if there is error
            if (res.payload.message) {
                dispatch(onError({value: `${res.payload.message} While Uploading the Image`}));
                setSending(false)
                return
            }

            //Get the Data from the response
            const {
                payload: {
                    data: {
                        secure_url: mainImgURL,
                        public_id: mainImgID,
                    },
                },
            } = res;

            //NOTIFICATION
            dispatch(OnSuccess({value: "Your Image has uploaded Successfully 😍"}))
            dispatch(onPending({value: "We are Creating the Post 😊"}))

            //Create the Post
            await dispatch(createPost({
                mainImage: {
                    url: mainImgURL,
                    public_id: mainImgID
                },
                header: header,
                userId: ID,
                postData: savedData,
                published: checked,
                category: categories
            }))

            setSending(false);
            //NOTIFICATION
            dispatch(OnSuccess({value: "Your Post has created Successfully 😍"}));
            // redirect the user to the posts page
            router.push('/user/blog')
        }else{
            dispatch(onError({value: "Please Fill all the Fields 😢"}))
        }
    }, []);

    return (
        <>
            <div className={classes.Editor}>
                <ReactEditorJS onInitialize={handleInitialize} tools={editorConfig}/>
                <button onClick={() => handleSave(mainImage, heading, categories)} className={classes.SavBtn}>
                    <Image src={'/Images/icons/SavePost.svg'} width={24} height={24}
                           alt={"Save post"}/> {sending ? <><span>Please Wait... </span> <Spinner size={2} color={`#ffffff`}/> </> : "Create Post"}
                </button>
            </div>
        </>
    );
}

export default Editor;
