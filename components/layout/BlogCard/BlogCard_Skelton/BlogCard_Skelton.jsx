import React from "react";
// Style
import classes from './BlogCard_Skelton.module.scss';

function BlogCardSkelton() {
    return (
        <article className={classes.BlogCard}>
            <div style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} className={classes.BlogCard_Image}></div>
            <h3 style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}}></h3>
            <div className={classes.BlogCard_CategoriesContainer}>
                <span style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} className={classes.BlogCard_Category}></span>
                <span style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} className={classes.BlogCard_Category}></span>
                <span style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} className={classes.BlogCard_Category}></span>
                <span style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} className={classes.BlogCard_Category}></span>
            </div>
        </article>
    );
}

export default BlogCardSkelton;
