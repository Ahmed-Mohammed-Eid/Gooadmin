import Image from "next/image";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
// import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import coldarkdark from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark";
// Supported Code Snippets
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";

//Import Custom Styles for the Editor
import classes from '../components/Editor/EditorElementsStyle.module.scss'

// Initialize the SyntaxHighlighter with the Supported Languages
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("sql", sql);

const parseMyJson = (code) => {
    const result = code.blocks.map((current, i) => {
        switch (current.type) {
            case "paragraph":
                return (
                    <p
                        className={classes.Editor_Paragraph}
                        dangerouslySetInnerHTML={{__html: current.data.text}}
                        key={i}
                    ></p>
                );
            case "header":
                switch (current.data.level) {
                    case 1:
                        return <h1 key={i}>{current.data.text}</h1>;
                    case 2:
                        return <h2 key={i}>{current.data.text}</h2>;
                    case 3:
                        return <h3 key={i}>{current.data.text}</h3>;
                    case 4:
                        return <h4 key={i}>{current.data.text}</h4>;
                    case 5:
                        return <h5 key={i}>{current.data.text}</h5>;
                    case 6:
                        return <h6 key={i}>{current.data.text}</h6>;
                    default:
                        return <h1 key={i}>{current.data.text}</h1>;
                }
            case "image":
                return (
                    <div key={i} className={classes.NextImg_Wrapper}>
                        <Image
                            layout="fill"
                            src={current.data.file.url}
                            alt={current.data.caption}
                            onClick={(e) => {
                                e.target.requestFullscreen();
                            }}
                        />
                    </div>
                );
            case "raw":
                return (
                    <div
                        key={i}
                        dangerouslySetInnerHTML={{__html: current.data.html}}
                    ></div>
                );
            case "list":
                if (current.data.style === "ordered") {
                    return (
                        <ol key={i} className={classes.List}>
                            {current.data.items.map((item, index) => {
                                return (
                                    <li
                                        key={"i" + index}
                                        dangerouslySetInnerHTML={{
                                            __html: item,
                                        }}
                                    ></li>
                                );
                            })}
                        </ol>
                    );
                } else {
                    return (
                        <ul key={i} className={classes.List}>
                            {current.data.items.map((item, index) => {
                                return (
                                    <li
                                        key={"i" + index}
                                        dangerouslySetInnerHTML={{
                                            __html: item,
                                        }}
                                    ></li>
                                );
                            })}
                        </ul>
                    );
                }
            case "AnyButton":
                return (
                    <a key={i} target="_blank" rel="noreferrer" href={current.data.link}>
                        <button>{current.data.text}</button>
                    </a>
                );
            case "quote":
                return (
                    <blockquote className={classes.Blockquote} key={i}>
                        {current.data.text}{" "}
                        {current.data.caption.lenth !== "" && (
                            <cite className={classes.Cite}>{current.data.caption}</cite>
                        )}
                    </blockquote>
                );
            case "codeSnippet":
                return (
                    <div className={classes.CodeSnippetContainer}>
                        <SyntaxHighlighter
                            key={i}
                            language={current.data.language}
                            style={coldarkdark}
                            showLineNumbers
                        >
                            {current.data.code}
                        </SyntaxHighlighter>
                        <button
                            className={classes.CodeSnippet_Copy}
                            onClick={() => {
                                /* Copy the text inside the text field */
                                navigator.clipboard.writeText(current.data.code);
                            }}
                        >
                            Copy
                        </button>
                    </div>
                );
            case "checklist":
                return current.data.items.map((item, index) => {
                    return (
                        <div key={i + Math.random()}>
                            <input
                                type={"checkbox"}
                                checked={item.checked}
                                id={current.id + index}
                                onChange={() => {
                                }}
                            />
                            <label htmlFor={current.id + index}>{item.text}</label>
                        </div>
                    );
                });
            case "embed":
                return (
                    <div className={classes.Embed_Wrapper} key={i}>
                        <iframe
                            src={current.data.embed}
                            title={current.data.caption}
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            case "imageLink":
                return (
                    <div key={i} className={classes.NextImg_Wrapper}>
                        <Image
                            layout="fill"
                            src={current.data.url}
                            alt={current.data.caption}
                            onClick={(e) => {
                                e.target.requestFullscreen();
                            }}
                        />
                    </div>
                );
            default:
                return null;
        }
    });
    // return the array of components || null
    return result;
};

export default parseMyJson;