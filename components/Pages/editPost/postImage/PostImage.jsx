import React, { useRef, useState } from "react";
import classes from "./PostImage.module.scss";
// Imports
import ImageIcon from "../../../layout/ImagesIcons/Image";
import Image from "next/image";

function postImage({ text, getMainImage, oldImage }) {
    // Image Name and Size State
    const [imageName, setImageName] = useState();
    const [imageSize, setImageSize] = useState();
    const [choosedImage, setChoosedImage] = useState();

    // Ref for input file
    const mainImageRef = useRef(false);

    // FN() when value change
    const onInputChange = async () => {
        // get the selected file
        const mainImageFile = mainImageRef.current.files[0];
        // calculate the size of the Image
        const calculatedSize =
            mainImageFile.size > 1024 * 1024
                ? `${(mainImageFile.size / (1024 * 1024)).toFixed(2)} MB`
                : `${(mainImageFile.size / 1024).toFixed(2)} KB`;

        // Set the Values in the state
        setImageName(mainImageFile.name);
        setImageSize(calculatedSize);
        // Add Image to State after read it
        makeImageReadyForPreview(mainImageFile);
        // Send Image to the parent State
        getMainImage(mainImageFile);
    };

    // Function for converting the selected image to preview image
    function makeImageReadyForPreview(img) {
        // add a reader for reading the Image file
        const fileReader = new FileReader();

        fileReader.addEventListener("load", (event) => {
            setChoosedImage(event.target.result);
        });
        const ImageForPreview = fileReader.readAsDataURL(img);
    }

    return (
        <section className={classes.MainImage}>
            <input
                type='file'
                name='mainImage'
                id='mainImage'
                accept='image/*'
                ref={mainImageRef}
                onChange={onInputChange}
            />
            <label
                htmlFor='mainImage'
                className={imageName && imageSize ? classes.Active : ""}
            >
                <div className={classes.EditImage_Old}>
                    <Image
                        src={oldImage}
                        width={100}
                        height={60}
                        objectFit={"cover"}
                    />
                </div>
                {choosedImage && (
                    <div className={classes.EditImage_New}>
                        <Image
                            src={choosedImage}
                            width={100}
                            height={60}
                            objectFit={"cover"}
                        />
                    </div>
                )}
                <ImageIcon />
                {text}
                {imageName && (
                    <p className={classes.SelectedFile}>
                        Name: <span>{imageName}</span> Size:{" "}
                        <span>{imageSize}</span>
                    </p>
                )}
            </label>
        </section>
    );
}

export default postImage;
