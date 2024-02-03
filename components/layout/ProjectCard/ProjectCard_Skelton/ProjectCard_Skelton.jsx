import React from "react";
// Style
import classes from "./ProjectCard_Skelton.module.scss";

function ProjectCardSkelton() {
    return (
        <article className={classes.Project}>
            <div
                style={{
                    animation: `${classes.skelton} 1.5s infinite linear alternate`,
                }}
                className={[classes.Project_Image]}
            ></div>
            <div className={classes.Data_P1}>
                <div className={classes.Project_Name}>
                    <a
                        style={{
                            animation: `${classes.skelton} 1.5s infinite linear alternate`,
                        }}
                        className={classes.Project_Open}
                    >
                        <h3
                            style={{
                                animation: `${classes.skelton} 1.5s infinite linear alternate`,
                            }}
                        ></h3>
                    </a>
                    <time style={{animation: `${classes.skelton} 1.5s infinite linear alternate`}} ></time>
                </div>
                <div className={classes.Project_Links}></div>
            </div>
            <p className={classes.Description}>
                <span
                    style={{
                        animation: `${classes.skelton} 1.5s infinite linear alternate`,
                    }}
                ></span>
                <span
                    style={{
                        animation: `${classes.skelton} 1.5s infinite linear alternate`,
                    }}
                ></span>
                <span
                    style={{
                        animation: `${classes.skelton} 1.5s infinite linear alternate`,
                    }}
                ></span>
            </p>
        </article>
    );
}

export default ProjectCardSkelton;
