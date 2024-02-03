import React from "react";
import classes from "./FloatIcons.module.scss";

import SearchIcon from "./SearchIcon/SearchIcon";
import ContactIcon from "./contactIcon/contactIcon";
import Link from "next/link";

function FloatIcons() {
    return (
        <section className={classes.FloatIcons}>
            <SearchIcon />
            <Link href={"/contact"} passHref>
                <a>
                    <ContactIcon />
                </a>
            </Link>
        </section>
    );
}

export default FloatIcons;
