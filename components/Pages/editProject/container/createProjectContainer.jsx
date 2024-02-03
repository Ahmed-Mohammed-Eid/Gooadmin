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
} from "../../../../redux/slices/editProjectSlice";
// Create Project Actions
import {
    UploadImageToCloudinary,
    UploadVideoToCloudinary,
    editProject,
} from "../../../../redux/actions/editProjectActions";

function createProjectContainer({project, projectId}) {
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
    } = useSelector((state) => state.editProject);

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
    const editTheProject = async () => {
        let dataUpdatedObject = {projectId};
        // Set the loading state that show the spinner
        setLoading(true)
        // Action for Display a notification with start uploading Main Image
        dispatch(
            onProjectFieldChange({
                inputName: "pendingMessage",
                value: "Uploading Main Image",
            })
        );
        // Uploading Main IMage and get res data in variables;
        if (mainImage) {
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

            // Check if there is an error with uploading main Image to notify
            if (mainImgMSG) {
                dispatch(
                    onProjectFieldChange({inputName: "errorMessage", value: mainImgMSG})
                );
            }

            dataUpdatedObject = {
                ...dataUpdatedObject,
                mainImage: {
                    url: mainImgURL,
                    Img_Id: mainImgID,
                },
            }
        }
        // Array for saving the data from SliderImages
        const ArrayOfSliderData = [];
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
                // Check If there is an error with uploading Image to notify
                if (sliderImgMSG) {
                    dispatch(
                        onProjectFieldChange({
                            inputName: "errorMessage",
                            value: sliderImgMSG,
                        })
                    );
                }
                // Push the Data Of The Current Image to The Array Of Data
                ArrayOfSliderData.push({
                    url: sliderImgURL,
                    Img_Id: sliderImgID,
                });
            }
        }

        // Check if there is Array of Images and set it in the object
        if (ArrayOfSliderData.length > 0) {
            dataUpdatedObject = {
                ...dataUpdatedObject,
                sliderImages: ArrayOfSliderData,
            }
        }
        ;

        // ######################################################################
        // Upload Video to Cloud and get its URL && ID
        // ######################################################################
        if (projectVideo.length > 0) {
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

            dataUpdatedObject = {
                ...dataUpdatedObject,
                projectVideo: {
                    url: videoURL,
                    video_Id: videoID,
                    format: videoType,
                },
            }
        }

        // Check if there is input data in inputs
        if (nameOfCreator) {
            // add property to existing object
            dataUpdatedObject['nameOfCreator'] = nameOfCreator;
        }
        if (nameOfProject) {
            // add property to existing object
            dataUpdatedObject['nameOfProject'] = nameOfProject;
        }
        if (projectDescription) {
            // add property to existing object
            dataUpdatedObject['projectDescription'] = projectDescription;
        }
        if (createdAtInReal) {
            // add property to existing object
            dataUpdatedObject['createdAtInReal'] = createdAtInReal;
        }
        if (technologies) {
            // add property to existing object
            dataUpdatedObject['technologies'] = technologies;
        }
        if (livePreviewLink) {
            // add property to existing object
            dataUpdatedObject['livePreviewLink'] = livePreviewLink;
        }
        if (githubLink) {
            // add property to existing object
            dataUpdatedObject['githubLink'] = githubLink;
        }
        if (published) {
            // add property to existing object
            dataUpdatedObject['published'] = published;
        }

        // creating a project in Database With The Data of inputs and Images URLS
        await dispatch(editProject(dataUpdatedObject)
        );
        // Set the loading state that show the spinner
        setLoading(false)
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
            router.push('/user/portfolio')
        } else if (errorMessage) {
            toast.error(errorMessage);
            dispatch(ClearMessage({messageType: "errorMessage"}));
        } else {
            return;
        }
    }, [pendingMessage, successMessage, errorMessage]);

    return (
        <section className={classes.CreateProject}>
            <MainImage text={"New Main Image"} getMainImage={getMainImageFromComponent}/>
            <SliderImage
                text={"New Slider Images"}
                getSliderImages={getSliderImagesFromComponent}
            />
            <VideoImage text={'New Video'} getTheProjectVideo={getTheProjectVideoFromComponent}/>
            <InputsContainer loadingState={loading} project={project} projectId={projectId} createProject={editTheProject}/>
        </section>
    );
}

export default createProjectContainer;
