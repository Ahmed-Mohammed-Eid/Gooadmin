import React, {useState, useRef} from "react";
import classes from "./SliderImage.module.scss";
// Imports
import ImageIcon from "../../../layout/ImagesIcons/Image";

function SliderImage({text, getSliderImages}) {

    // Images Slider Number
    const [imagesNumber, setImagesNumber] = useState(false);
    // Ref for input
    const sliderImagesRef = useRef(false);

    // FN() for number changing
    const onInputChange = () => {
        // get the selected file
        const sliderImageFiles = sliderImagesRef.current.files;

        // set the State of the number of images
        setImagesNumber(sliderImageFiles.length);

        // Send the Image to the Parent Component
        getSliderImages(sliderImageFiles);
    };

    return (
        <section className={classes.SliderImage}>
            <input
                type="file"
                name="sliderImages"
                multiple
                id="SliderImage"
                accept="image/*"
                ref={sliderImagesRef}
                onChange={onInputChange}
            />
            <label
                htmlFor="SliderImage"
                className={imagesNumber ? classes.Active : ""}
            >
                <ImageIcon/>
                {text}
                {imagesNumber && (
                    <p className={classes.SelectedFilesNumber}>
                        Images Number: <span>{imagesNumber} Images</span>
                    </p>
                )}
            </label>
        </section>
    );
}

export default SliderImage;
