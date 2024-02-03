import classes from "./CodeSnippet.module.scss";

class CodeSnippet {
    static get toolbox() {
        return {
            title: "Code Snippet",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="M6,6A2,2,0,0,1,8,4,1,1,0,0,0,8,2,4,4,0,0,0,4,6V9a2,2,0,0,1-2,2,1,1,0,0,0,0,2,2,2,0,0,1,2,2v3a4,4,0,0,0,4,4,1,1,0,0,0,0-2,2,2,0,0,1-2-2V15a4,4,0,0,0-1.38-3A4,4,0,0,0,6,9Zm16,5a2,2,0,0,1-2-2V6a4,4,0,0,0-4-4,1,1,0,0,0,0,2,2,2,0,0,1,2,2V9a4,4,0,0,0,1.38,3A4,4,0,0,0,18,15v3a2,2,0,0,1-2,2,1,1,0,0,0,0,2,4,4,0,0,0,4-4V15a2,2,0,0,1,2-2,1,1,0,0,0,0-2Z" />
                </svg>`,
        };
    }

    constructor({ data }) {
        this.wrapper = undefined;
        this.data = data;
    }

    render() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add(classes.CodeSnippets_Wrapper);
        const textarea = document.createElement("textarea");
        // Check if there is code in the data object set it in the textarea
        if (this.data.code) {
            textarea.value = this.data.code;
        }
        // If there is no code in the data object set the placeholder
        textarea.placeholder = "Put Your Code Here...";
        textarea.classList.add(classes.TextAreaCode);

        const select = document.createElement("select");
        const options = ["javascript", "css", 'python', 'sql'];
        options.forEach((opt, i) => {
            const option = document.createElement("option");
            option.value = opt;
            option.innerHTML = opt;
            select.appendChild(option);
        });

        // Check if there is a language in the data object set it in the select
        if (this.data.language) {
            select.value = this.data.language;
        }

        this.wrapper.appendChild(textarea);
        this.wrapper.appendChild(select);

        return this.wrapper;
    }

    save(block) {
        return {
            code: block.querySelector("textarea").value,
            language: block.querySelector("select").value,
        };
    }
}

export default CodeSnippet;
