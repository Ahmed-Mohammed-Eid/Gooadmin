import React from "react";
import classes from "./CourseCard.module.scss";
import Image from "next/image";

const CourseCard = ({ src, title, description }) => {
    return (
        <article className={classes.CourseCard}>
            <div className={classes.CourseCard_Image}>
                <Image
                    src={src}
                    alt={title}
                    width={350}
                    height={300}
                    loading={"lazy"}
                />
            </div>
            <h3>{title}</h3>
            <p className={classes.CourseCard_Description}>
                {description}
            </p>
        </article>
    )
}
export default CourseCard