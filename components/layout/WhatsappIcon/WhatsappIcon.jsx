// WhatsAppIcon.js
import React from 'react';
import styles from './WhatsappIcon.module.scss';
import Image from "next/image";
import Link from "next/link";

const WhatsAppIcon = () => {
    return (
        <Link target={'_blank'} href={'https://wa.me/+201270358999'} passHref>
            <a href={'https://wa.me/+201270358999'} target={'_blank'}>
                <div className={styles.whatsappIcon}>
                    <Image src={`/Images/icons/About_Wp.svg`} alt="WhatsApp" width={30} height={30}/>
                </div>
            </a>
        </Link>
    );
};

export default WhatsAppIcon;
