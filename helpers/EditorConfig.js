// #############################################################################
// Editor Options
// #############################################################################
import ImageTool from "@editorjs/image";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import RawTool from "@editorjs/raw";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Checklist from "@editorjs/checklist";
import Hyperlink from "editorjs-hyperlink";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import AnyButton from "editorjs-button";

// Test [Code Snippet] Made by Me
import CodeSnippet from "../components/Editor/CodeSnippet";
// import ImageLink from "../components/Editor/ImageLink";
import ImageLink from "../components/Pages/editPost/Editor/ImageLink";
import axios from "axios";

// #############################################################################
// Upload Image to Firebase and get Link
// #############################################################################
// import {
//     storage,
//     ref,
//     getDownloadURL,
//     uploadBytes,
// } from "../firebase/firebase";

const editorConfig = {
    header: Header,
    raw: RawTool,
    Paragraph: {
        class: Paragraph,
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: "unordered",
        },
    },
    AnyButton: {
        class: AnyButton,
        inlineToolbar: false,
        config: {
            css: {
                btnColor: "btn--gray",
            },
        },
    },
    changeCase: {
        class: ChangeCase,
        config: {
            showLocaleOption: true, // enable locale case options
            locale: "tr", // or ['tr', 'TR', 'tr-TR']
        },
    },
    // style: EditorJSStyle.StyleInlineTool,
    quote: Quote,
    embed: {
        class: Embed,
        inlineToolbar: true,
    },
    Marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
    },
    hyperlink: {
        class: Hyperlink,
        config: {
            shortcut: "CMD+L",
            target: "_blank",
            rel: "nofollow",
            availableTargets: ["_blank", "_self"],
            availableRels: ["author", "noreferrer"],
            validate: false,
        },
    },
    underline: Underline,
    codeSnippet: {
        class: CodeSnippet
    },
    imageLink: {
        class: ImageLink
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    InlineCode: InlineCode,
    image: {
        class: ImageTool,
        config: {
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByFile(file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "AMB_BLOG");

                    const res = await axios.post(`https://api.cloudinary.com/v1_1/dkmhptvge/image/upload`, formData)
                        .then((res) => {
                            return res
                        })
                        .catch((err) => {
                            return err
                        });

                    return {
                        success: 1,
                        file: {
                            url: res.data.secure_url
                        }
                    }
                },
            },
        },
    },
};

export default editorConfig;
