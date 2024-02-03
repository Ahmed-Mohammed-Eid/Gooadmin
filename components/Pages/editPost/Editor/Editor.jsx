import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// Spinner
import Spinner from "../../../layout/Spinner";
// #############################################################################
// Create Editor
// #############################################################################
import {createReactEditorJS} from "react-editor-js";
import editorConfig from "../../../../helpers/EditorConfig";
// #############################################################################
// Axios
// #############################################################################
import axios from "axios";
// Create the Editor
const ReactEditorJS = createReactEditorJS();
// Redux
import {useDispatch} from "react-redux";
//######## Upload the Image
import {UploadImageToCloudinary} from "../../../../redux/actions/createProjectActions";
//######### Custom style for the Editor
import classes from "./EditorElementsStyle.module.scss";
import {toast} from "react-toastify";

// Editor Component
function Editor({postId, mainImage, categories, header, checked, defaultData}) {
    // Router
    const router = useRouter();
    // Redux
    const dispatch = useDispatch();
    // Make a ref for the Editor to be able to save
    const editorJS = React.useRef(null);
    const [sending, setSending] = useState(false);

    // Set up the ref on the Editor
    const handleInitialize = React.useCallback((instance) => {
        editorJS.current = instance;
    }, []);

    // Save Data in DB
    const handleSave = React.useCallback(
        async (theImg, header, categories, checked) => {
            const savedData = await editorJS.current.save();
            // Variables to set the image data
            let mainImgURL = null;
            let mainImgID = null;

            setSending(true);
            //Check If there is an Image to Upload and Create the Post
            if (theImg) {
                //Change Btn Text
                // Uploading Main IMage and get res data in variables
                const {
                    payload: {
                        data: {secure_url: ImgURL, public_id: ImgID},
                    },
                } = await dispatch(
                    UploadImageToCloudinary({
                        ImageFile: theImg,
                        Save_Method_And_Place: "AMB_BLOG",
                    })
                );
                mainImgURL = ImgURL;
                mainImgID = ImgID;
            }

            let objectData = {postId, header, categories, checked, savedData};
            if (mainImgURL && mainImgID) {
                objectData = {...objectData, mainImgURL, mainImgID}
            }

            // Update the Post
            axios.put(`/api/post/updatePost`, objectData)
                .then(res => {
                    setSending(false);
                    //Redirect to the user blog
                    router.push('/user/blog')
                        .then(() => {
                            toast.success('Post Edited Successfully')
                        })
                })
                .catch(err => {
                    console.log(err);
                    setSending(false);
                })
        },
        []
    );

    return (
        <>
            <div className={classes.Editor}>
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={editorConfig}
                    defaultValue={defaultData}
                />
                <button
                    onClick={() => handleSave(mainImage, header, categories, checked)}
                    className={classes.SavBtn}
                >
                    <Image
                        src={"/Images/icons/SavePost.svg"}
                        width={24}
                        height={24}
                        alt={"Save post"}
                    />{" "}
                    {sending ? (
                        <>
                            <span>Please Wait... </span>{" "}
                            <Spinner size={2} color={`#ffffff`}/>{" "}
                        </>
                    ) : (
                        "Edit"
                    )}
                </button>
            </div>
        </>
    );
}

export default Editor;
