import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./CheckButton.module.scss";

function CheckButton({ iconName, iconName2 }) {
    const [Icon, setIcon] = useState(iconName);
    const [documentLanguage, setdocumentLanguage] = useState("EN");

    const changeButton = () => {
        setIcon(Icon === iconName ? iconName2 : iconName);
        setdocumentLanguage(documentLanguage === "EN" ? "AR" : "EN");
    };

    useEffect(() => {
        document.documentElement.lang = documentLanguage;
    }, [documentLanguage]);

    return (
        <button className={classes.CheckButton} onClick={changeButton}>
            <Image
                src={`/Images/icons/${Icon}`}
                width={35}
                height={35}
                alt="Icon"
            />
        </button>
    );
}

export default CheckButton;
