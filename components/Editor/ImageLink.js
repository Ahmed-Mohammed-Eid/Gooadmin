import classes from './ImageLink.module.scss'

class ImageLink {
    static get toolbox() {
        return {
            title: "Image link",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="gallery-add" transform="translate(-748 -252)">
                        <path id="Vector" d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z" transform="translate(755 258)" fill="none" stroke="#292d32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Vector-2" data-name="Vector" d="M11,0H7C2,0,0,2,0,7v6c0,5,2,7,7,7h6c5,0,7-2,7-7V8" transform="translate(750 254)" fill="none" stroke="#292d32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Vector-3" data-name="Vector" d="M0,0H5.5" transform="translate(763.75 257)" fill="none" stroke="#292d32" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Vector-4" data-name="Vector" d="M0,5.5V0" transform="translate(766.5 254.25)" fill="none" stroke="#292d32" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Vector-5" data-name="Vector" d="M0,6.953l4.93-3.31a2.253,2.253,0,0,1,2.64.14l.33.29a2.229,2.229,0,0,0,2.82,0L14.88.5A2.229,2.229,0,0,1,17.7.5l1.63,1.4" transform="translate(750.67 263.997)" fill="none" stroke="#292d32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Vector-6" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(748 252)" fill="none" opacity="0"/>
                        </g>
                    </svg>`,
        };
    }

    constructor() {
        this.wrapper = undefined;
    }

    render() {
        // Create a Wrapper
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add(classes.ImageLink_Wrapper);
        // Create a url Input
        const inputUrl = document.createElement("input");
        inputUrl.placeholder = "Image URL...";
        // Insert Input inside Wrapper
        this.wrapper.appendChild(inputUrl);
        // Add Event
        inputUrl.addEventListener("paste", (e) => {
            // get the URL from the Clipboard
            const url = e.clipboardData.getData("text");
            // create an Image && Caption Input
            const resultImage = document.createElement("img");
            const caption = document.createElement("input");
            // Put the url and placeholder
            caption.placeholder = "Caption...";
            resultImage.src = url;
            // ride the wrapper content
            this.wrapper.innerHTML = "";
            // Add the new wrapper data
            this.wrapper.appendChild(resultImage);
            this.wrapper.appendChild(caption);
        });

        // Return the FrontEnd
        return this.wrapper;
    }

    save(blocks) {
        return {
            url: blocks.querySelector("img").src,
            caption: blocks.querySelector("input").value,
        };
    }
}

export default ImageLink;
