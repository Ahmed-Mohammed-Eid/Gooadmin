import React, {useEffect, useState} from "react";
import classes from "./createProjectContainer.module.scss";
import {useRouter} from "next/router";
// Components
import MainImage from "../mainImage/mainImage";
import SliderImage from "../SliderImage/SliderImage";
import VideoImage from "../videoImage/VideoImage";
import InputsContainer from "../InputsContainer/InputsContainer";

//Notifications
import {toast} from "react-toastify";
//Redux
import {useDispatch, useSelector} from "react-redux";
import {
    ClearMessage,
    onProjectFieldChange,
} from "../../../../redux/slices/createProjectSlice";
// Create Project Actions
import {
    UploadImageToCloudinary,
    UploadVideoToCloudinary,
    createProject as CreateProjectOnServer,
} from "../../../../redux/actions/createProjectActions";

function createProjectContainer() {
    // ROUTER
    const router = useRouter();
    // Initialize the redux dispatcher
    const dispatch = useDispatch();
    // State for saving images from child components (main, slider)
    const [mainImage, setMainImage] = useState();
    const [sliderImages, setSliderImages] = useState([]);
    const [projectVideo, setProjectVideo] = useState([]);
    // LOADING STATE
    const [loading, setLoading] = useState(false)
    // The State of Inputs value from redux to create a project with
    const {
        nameOfCreator,
        nameOfProject,
        projectDescription,
        createdAtInReal,
        technologies,
        livePreviewLink,
        githubLink,
        published,
        successMessage,
        errorMessage,
        pendingMessage,
    } = useSelector((state) => state.createProject);

    //###########################################################################
    // ############################### Get the Main Image #######################
    //###########################################################################
    const getMainImageFromComponent = (mainImage) => {
        setMainImage(mainImage);
    };

    //###########################################################################
    // ############################### Get the Slider Images ####################
    //###########################################################################
    const getSliderImagesFromComponent = (sliderImages) => {
        setSliderImages(sliderImages);
    };

    //###########################################################################
    // ############################### Get the Project Video ####################
    //###########################################################################
    const getTheProjectVideoFromComponent = (video) => {
        setProjectVideo(video);
    };

    //###########################################################################
    // ############################### Create the Project #######################
    //###########################################################################
    const createProject = async () => {
        // CHECK IF ALL FIELDS HAVE DATA
        if(!mainImage || sliderImages.length <= 0 || projectVideo.length <= 0 || !nameOfCreator || !nameOfProject || !projectDescription || !createdAtInReal || !technologies || !livePreviewLink || !githubLink){
            toast.error('Please Fill All Inputs');
            return;
        }
        // Set the loading state that show the spinner
        setLoading(true)
        // Action for Display a notification with start uploading Main Image
        dispatch(
            onProjectFieldChange({
                inputName: "pendingMessage",
                value: "Uploading Main Image",
            })
        );
        // Uploading Main IMage and get res data in variables
        const {
            payload: {
                data: {
                    secure_url: mainImgURL,
                    public_id: mainImgID,
                    message: mainImgMSG,
                },
            },
        } = await dispatch(
            UploadImageToCloudinary({
                ImageFile: mainImage,
                Save_Method_And_Place: "AMB_PROJECTS",
            })
        );
        // Array for saving the data from SliderImages
        const ArrayOfSliderData = [];
        // Check if there is an error with uploading main Image to notify
        if (mainImgMSG) {
            dispatch(
                onProjectFieldChange({inputName: "errorMessage", value: mainImgMSG})
            );
        }
        // Uploading Slider Images and get there data
        if (sliderImages.length > 0) {
            // Loop through Slider Images and Upload them and Notify Me
            for (let i = 0; i < sliderImages.length; i++) {
                dispatch(
                    onProjectFieldChange({
                        inputName: "pendingMessage",
                        value: `Uploading Slider Image ${i + 1}`,
                    })
                );
                const {
                    payload: {
                        data: {
                            secure_url: sliderImgURL,
                            public_id: sliderImgID,
                            message: sliderImgMSG,
                        },
                    },
                } = await dispatch(
                    UploadImageToCloudinary({
                        ImageFile: sliderImages[i],
                        Save_Method_And_Place: "AMB_PROJECTS",
                    })
                );
                // Push the Data Of The Current Image to The Array Of Data
                ArrayOfSliderData.push({
                    url: sliderImgURL,
                    Img_Id: sliderImgID,
                });
                // Check If there is an error with uploading Image to notify
                if (sliderImgMSG) {
                    dispatch(
                        onProjectFieldChange({
                            inputName: "errorMessage",
                            value: sliderImgMSG,
                        })
                    );
                }
            }
        }

        // ######################################################################
        // Upload Video to Cloud and get its URL && ID
        // ######################################################################

        // Action for Display a notification with start uploading video
        dispatch(
            onProjectFieldChange({
                inputName: "pendingMessage",
                value: "Uploading the Video",
            })
        );
        // Uploading the Video and get res data in variables
        const {
            payload: {
                data: {
                    secure_url: videoURL,
                    public_id: videoID,
                    format: videoType,
                    message: videoMSG,
                },
            },
        } = await dispatch(
            UploadVideoToCloudinary({
                VideoFile: projectVideo,
                Save_Method_And_Place: "AMB_PROJECTS",
            })
        );
        // Check If there is an error with uploading Image to notify

        if (videoMSG) {
            dispatch(
                onProjectFieldChange({inputName: "errorMessage", value: videoMSG})
            );
        }

        // creating a project in Database With The Data of inputs and Images URLS
        await dispatch(CreateProjectOnServer({
                mainImage: {
                    url: mainImgURL,
                    Img_Id: mainImgID,
                },
                sliderImages: ArrayOfSliderData,
                projectVideo: {
                    url: videoURL,
                    video_Id: videoID,
                    format: videoType,
                },
                nameOfCreator,
                nameOfProject,
                projectDescription,
                createdAtInReal,
                technologies,
                livePreviewLink,
                githubLink,
                published,
            })
        );
        // Set the loading state that show the spinner
        setLoading(false);
        // Redirect to the portfolio in the user part
        router.push('/user/portfolio')
    };

    //###########################################################################
    // ############################### EFFECT ###################################
    //###########################################################################

    useEffect(() => {
        //Check if there is messages to notify and clear
        if (pendingMessage) {
            toast.info(pendingMessage);
            dispatch(ClearMessage({messageType: "pendingMessage"}));
        } else if (successMessage) {
            toast.success(successMessage);
            dispatch(ClearMessage({messageType: "successMessage"}));
        } else if (errorMessage) {
            toast.error(errorMessage);
            dispatch(ClearMessage({messageType: "errorMessage"}));
        } else {
            return;
        }
    }, [pendingMessage, successMessage, errorMessage]);

    return (
        <section className={classes.CreateProject}>
            <MainImage text={"Main Image"} getMainImage={getMainImageFromComponent}/>
            <SliderImage
                text={"Slider Images"}
                getSliderImages={getSliderImagesFromComponent}
            />
            <VideoImage getTheProjectVideo={getTheProjectVideoFromComponent}/>
            <InputsContainer loadingState={loading} createProject={createProject}/>
        </section>
    );
}

export default createProjectContainer;
