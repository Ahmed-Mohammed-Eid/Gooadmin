import Image from "next/image";
import React from "react";
import styles from "./contactIcon.module.scss";

const ContactIcon = () => {
    return (
        <div className={styles.ContactIcon}>
            <div className={styles.icon}>
                <Image
                    src={"/Contact.svg"}
                    width={22}
                    height={22}
                    alt={"search icon"}
                />
            </div>
            <span className={styles.tooltip}>Contact</span>
        </div>
    );
};

export default ContactIcon;
