import Script from "next/script";
import dynamic from "next/dynamic";

// Import Editor without SSR
const EditorJsWithNoSSR = dynamic(() => import("./Editor"), {
    ssr: false,
});

// Editor Component
export default function EditorPageToComponent({mainImage, ID}) {
    return (
        <div className={"editorjs"}>
            <EditorJsWithNoSSR mainImage={mainImage} ID={ID}/>
            <Script src="https://cdn.jsdelivr.net/npm/@editorjs/marker@latest"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/@editorjs/inline-code"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/@editorjs/embed@latest"></Script>
            <Script src="https://cdn.jsdelivr.net/gh/paraswaykole/editor-js-code@latest/dist/bundle.js"></Script>
            {/* Inline tool for inline style */}
            <Script src="https://cdn.jsdelivr.net/npm/editorjs-style@latest"></Script>
        </div>
    );
}