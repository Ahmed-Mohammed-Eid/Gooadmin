import React, { useRef, useState } from "react";
import classes from "./VideoImage.module.scss";
// Imports
import VideoIcon from "../../../layout/ImagesIcons/VideoIcon";

function VideoImage({ text, getTheProjectVideo }) {
    // the state of video Name
    const [videoName, setVideoName] = useState(false);
    // the state of video Size
    const [videoSize, setVideoSize] = useState(false);

    // Ref for input file
    const projectVideoRef = useRef(false);

    // FN() when value change
    const onInputChange = () => {
        // get the selected file
        const VideoFile = projectVideoRef.current.files[0];
        // calculate the size of the Image
        const calculatedSize =
            VideoFile.size > 1024 * 1024
                ? `${(VideoFile.size / (1024 * 1024)).toFixed(2)} MB`
                : `${(VideoFile.size / 1024).toFixed(2)} KB`;

        // Set the Values in the state
        setVideoName(VideoFile.name);
        setVideoSize(calculatedSize);
        // Send the Video to Parent Component for creation process
        getTheProjectVideo(VideoFile)
    };

    return (
        <section className={classes.VideoImage}>
            <input
                type="file"
                name="projectVideo"
                id="ProjectVideo"
                accept="video/*"
                ref={projectVideoRef}
                onChange={onInputChange}
            />
            <label htmlFor="ProjectVideo" className={(videoName && videoSize) ? classes.Active : ""}>
                <VideoIcon />
                {text}
                {videoName && videoSize && (
                    <p className={classes.SelectedVedio}>
                        Name: <span>{videoName}</span> Size:{" "}
                        <span>{videoSize}</span>
                    </p>
                )}
            </label>
        </section>
    );
}

export default VideoImage;
