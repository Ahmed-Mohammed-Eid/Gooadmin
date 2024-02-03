import Link from "next/link";
import Image from "next/image";
import styles from "./SearchResult.module.scss";

const SearchResult = ({ imageSrc, header, date, category, link, target }) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Link target={target} href={link} passHref><a target={target} href={link}><Image src={imageSrc} alt={header} layout="fill" objectFit="cover" /></a></Link>
            </div>
            <div className={styles.textContainer}>
                <h2 className={styles.header} title={header}><Link target={target} href={link}><a target={target} href={link}>{header}</a></Link></h2>
                <div className={styles.metaData}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.category}>{category}</span>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
