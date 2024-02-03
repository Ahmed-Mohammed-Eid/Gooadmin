import React from "react";
// Style
import classes from "./ProjectCardAdmin.module.scss";
// Components
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

function ProjectCard({ src, name, description, date, github, live, projectId }) {
    // ROUTER
    const router = useRouter();

    // FUNCTIONS
    const EditHandler = () => {
        router.push(`/admin/edit/project/${projectId}`);
    }

    const RemoveHandler = () => {
        if (window.confirm(`The Project With the Title "${name}" will be removed. Are you Sure you want to delete it?`)) {
            axios.delete(`/api/project/DeleteProjectApi?ID=${projectId}`)
                .then(res => {
                    toast.success('Project Deleted Successfully ✨');
                    router.push('/user/portfolio')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

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
            <div className={classes.Buttons}>
                <button onClick={EditHandler}><Image src={'/Images/icons/Edit.svg'} width={16} height={16} alt={'Delete Icon'}/>Edit</button>
                <button onClick={RemoveHandler}><Image src={'/Images/icons/Delete.svg'} width={16} height={16} alt={'Delete Icon'}/>Delete
                </button>
            </div>
        </article>
    );
}

export default ProjectCard;
