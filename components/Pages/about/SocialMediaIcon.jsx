import Image from "next/image";
import classes from './SocialMediaIcon.module.scss';
import Link from "next/link";

const SocialMediaIcon = ({icon, iconAlt, accountLink}) => {
    return (
        <Link href={accountLink} passHref>
            <a target={"_blank"}>
                <button className={classes.Icon}>
                    <Image src={icon} width={24} height={24} alt={iconAlt}/>
                </button>
            </a>
        </Link>
    )
}

export default SocialMediaIcon