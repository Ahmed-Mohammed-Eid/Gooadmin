import React from "react";
// Style
import classes from "./BlogCard.module.scss";
// Imports
import Image from "next/image";

function BlogCard({ src, title, categories }) {
    return (
        <article className={classes.BlogCard}>
            <div className={classes.BlogCard_Image}>
                <Image
                    src={src}
                    alt={title}
                    width={350}
                    height={300}
                    loading={"lazy"}
                />
            </div>
            <h3>{title}</h3>
            <div className={classes.BlogCard_CategoriesContainer}>
                {categories.map((category) => (
                    <span className={classes.BlogCard_Category} key={category}>{category}</span>
                ))}
            </div>
        </article>
    );
}

export default BlogCard;
