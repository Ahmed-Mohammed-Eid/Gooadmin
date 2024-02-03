import React from "react";
// Style
import classes from "./ProjectCard.module.scss";
// Components
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ src, name, description, date, github, live, projectId }) {
    return (
        <article className={classes.Project}>
            <div className={[classes.Project_Image]}>
                <Link href={`/project/${projectId}`}><a className={classes.Project_Open}><Image alt={name} src={src} width={350} height={320} /></a></Link>
            </div>
            <div className={classes.Data_P1}>
                <div className={classes.Project_Name}>
                <Link href={`/project/${projectId}`}><a className={classes.Project_Open}><h3>{name}</h3></a></Link>
                    <time>{new Date(date).toLocaleString("en-us", { year: "numeric", month: 'long', day:"numeric" })}</time>
                </div>
                <div className={classes.Project_Links}>
                    <Link href={github} >
                        <a target="_blank">
                            <Image
                                src={"/Images/Home/github.svg"}
                                width={24}
                                height={24}
                                alt={'github'}
                            />
                        </a>
                    </Link>
                    <Link href={live}>
                        <a target="_blank">
                            <Image
                                src={"/Images/Home/eye.svg"}
                                width={24}
                                height={24}
                                alt={'live link'}
                            />
                        </a>
                    </Link>
                </div>
            </div>
            <p className={classes.Description}>{description}</p>
        </article>
    );
}

export default ProjectCard;
