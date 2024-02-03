import React, {useState, useRef} from "react";
import classes from "../../styles/projectPreview.module.scss";
//HELPERS
import {getProjectById} from "../../helpers/getProjectById";
import {getAllProjectsIdsForTheProjectPreview} from "../../helpers/getTheResult";

import Image from "next/image";
import Head from "next/head";
import WhatsAppIcon from "../../components/layout/WhatsappIcon/WhatsappIcon";


const ProjectId = ({project, projectId}) => {
    //The State of the Slider
    const [sliderState, setSliderState] = useState(0);
    //Reference for the Slider
    const sliderRef = useRef(null);
    //reference for the video
    const videoOverlayRef = useRef(null);

    //Convert the project to Json
    const theParsedProject = JSON.parse(project);

    //Convert the date
    const projectDate = new Date(
        theParsedProject.createdAtInReal
            ? theParsedProject.createdAtInReal
            : theParsedProject.createdOnServerAt
    ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    //Convert the category
    const projectCategory = theParsedProject.technologies.map(
        (technology, index) => {
            return <span key={"ck" + index}>{technology}</span>;
        }
    );

    // function to add on for the slider state and check if it's the last one
    const addSliderState = () => {
        if (sliderState < theParsedProject.sliderImages.length - 1) {
            setSliderState(sliderState + 1);
            sliderRef.current.scrollTop = 0;
        }
    };

    // function to remove one for the slider state and check if it's the first one
    const removeSliderState = () => {
        if (sliderState > 0) {
            setSliderState(sliderState - 1);
            sliderRef.current.scrollTop = 0;
        }
    };

    /*
    //function to play the video when the user clicks on the video and when video pause show an overlay screen
    */
    const playVideo = () => {
        videoOverlayRef.current.querySelector("video").play();
        videoOverlayRef.current.classList.add(classes.IsPlaying);
    };

    // function to add class to the video when it's paused
    const videoIsPaused = () => {
        videoOverlayRef.current.classList.remove(classes.IsPlaying);
    };

    return (
        <>
            {/* HEAD */}
            <Head>
                <title>{theParsedProject.nameOfProject}</title>
                <meta name="description" content={`Learn more about ${theParsedProject.nameOfProject}, a project completed by GooAdmin.`}/>
                <meta name="keywords" content={`project preview, gooadmin, ${theParsedProject.nameOfProject}, software development, education services`}/>
                <link rel="canonical" href={`https://gooadmin.com/project/${projectId}`}></link>
            </Head>
            {/* CONTENT */}
            <div className={"container"}>
                <section className={classes.ContentContainer}>
                    <div className={classes.Left}>
                        <div className={classes.Top}>
                            <div className={classes.MainImage}>
                                <Image
                                    src={theParsedProject.mainImage.url}
                                    alt={theParsedProject.header}
                                    layout='fill'
                                    objectFit={"cover"}
                                />
                            </div>
                        </div>
                        <div className={classes.Bottom}>
                            <div className={classes.Heading}>
                                <Image
                                    src={"/Images/icons/ProjectName.svg"}
                                    alt={"Project Name icon"}
                                    width={25}
                                    height={25}
                                />
                                <h1>{theParsedProject.nameOfProject}</h1>
                            </div>
                            <div className={classes.CreatorName}>
                                <Image
                                    src={"/Images/icons/Project_Creator.svg"}
                                    alt={"Creator Name icon"}
                                    width={25}
                                    height={25}
                                />
                                <h2>{theParsedProject.nameOfCreator}</h2>
                            </div>
                            <div className={classes.Description}>
                                <Image
                                    src={
                                        "/Images/icons/Project_Description.svg"
                                    }
                                    alt={"Description icon"}
                                    width={25}
                                    height={25}
                                />
                                <p>{theParsedProject.projectDescription}</p>
                            </div>
                            <div className={classes.ProjectLink}>
                                <Image
                                    src={"/Images/icons/Project_Preview.svg"}
                                    alt={"Project Link icon"}
                                    width={25}
                                    height={25}
                                />
                                <a
                                    href={theParsedProject.livePreviewLink}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                >
                                    {theParsedProject.livePreviewLink}
                                </a>
                            </div>
                            <div className={classes.GithubLink}>
                                <Image
                                    src={"/Images/icons/Project_Github.svg"}
                                    alt={"Github Link icon"}
                                    width={25}
                                    height={25}
                                />
                                <a
                                    href={theParsedProject.githubLink}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                >
                                    {theParsedProject.githubLink}
                                </a>
                            </div>
                            <div className={classes.CreatedAt}>
                                <Image
                                    src={"/Images/icons/Project_Date.svg"}
                                    alt={"Created At icon"}
                                    width={25}
                                    height={25}
                                />
                                <p>{projectDate}</p>
                            </div>
                            <div className={classes.Technologies}>
                                <Image
                                    src={
                                        "/Images/icons/Project_Technologies.svg"
                                    }
                                    alt={"Technologies icon"}
                                    width={27}
                                    height={27}
                                />
                                <p>{projectCategory}</p>
                            </div>
                            <WhatsAppIcon/>
                        </div>
                    </div>
                    <div className={classes.Right}>
                        <div
                            className={classes.Images}
                            ref={sliderRef}
                            style={{
                                gridTemplateColumns: `repeat(${theParsedProject.sliderImages.length}, 100%)`,
                            }}
                        >
                            {theParsedProject.sliderImages.map(
                                (image, index) => {
                                    return (
                                        <div
                                            key={"img" + index}
                                            className={[
                                                classes.Image,
                                                index === sliderState
                                                    ? classes.Active
                                                    : "",
                                            ].join(" ")}
                                        >
                                            <Image
                                                src={image.url}
                                                layout={"fill"}
                                                onClick={(e) => {
                                                    e.target.requestFullscreen()
                                                }}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <div className={classes.Slider_Arrows}>
                            <button onClick={removeSliderState}>
                                <Image
                                    src={"/Images/icons/Left_Arrow.svg"}
                                    width={26}
                                    height={24}
                                />
                            </button>
                            <button onClick={addSliderState}>
                                <Image
                                    src={"/Images/icons/Right_Arrow.svg"}
                                    width={26}
                                    height={24}
                                />
                            </button>
                        </div>
                        <div className={classes.Video} ref={videoOverlayRef}>
                            <video controls onPause={videoIsPaused}>
                                <source
                                    src={theParsedProject.projectVideo.url}
                                    type='video/mp4'
                                />
                            </video>
                            <div className={classes.Video_Overflow}>
                                <Image
                                    src={"/Images/icons/video-circle.svg"}
                                    width={75}
                                    height={75}
                                    onClick={playVideo}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectId;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
    const theProjectId = ctx.params.projectId;
    const project = await getProjectById(theProjectId);

    return {
        props: {
            project: JSON.stringify(project),
            projectId: theProjectId,
        },
        revalidate: 180,
    }
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
    const paths = await getAllProjectsIdsForTheProjectPreview();

    return {
        paths: paths,
        fallback: "blocking"
    }
}