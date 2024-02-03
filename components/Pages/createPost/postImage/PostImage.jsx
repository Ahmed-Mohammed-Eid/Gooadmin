import React, {useRef, useState} from "react";
import classes from "./PostImage.module.scss";
// Imports
import ImageIcon from "../../../layout/ImagesIcons/Image";


function postImage({text, getMainImage}) {

    // Image Name and Size State
    const [imageName, setImageName] = useState();
    const [imageSize, setImageSize] = useState();

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

        // Send Image to the parent State
        getMainImage(mainImageFile)
    };

    return (
        <section className={classes.MainImage}>
            <input
                type="file"
                name="mainImage"
                id="mainImage"
                accept="image/*"
                ref={mainImageRef}
                onChange={onInputChange}
            />
            <label
                htmlFor="mainImage"
                className={imageName && imageSize ? classes.Active : ""}
            >
                <ImageIcon/>
                {text}
                {imageName && (
                    <p className={classes.SelectedFile}>
                        Name: <span>{imageName}</span> Size: <span>{imageSize}</span>
                    </p>
                )}
            </label>
        </section>
    );
}

export default postImage;
