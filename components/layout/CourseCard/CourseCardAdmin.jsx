import React from "react";
import classes from "./CourseCardAdmin.module.scss";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

const CourseCard = ({src, title, description, youtubeLink, id}) => {
    // ROUTER
    const router = useRouter();

    // FUNCTIONS
    const EditHandler = () => {
        router.push(`/admin/edit/course/edit_course?ID=${id}`);
    }

    const RemoveHandler = () => {
        if (window.confirm(`The Course With the Title "${title}" will be removed. Are you Sure you want to delete it?`)) {
            axios.delete(`/api/course/DeleteCourseApi?ID=${id}`)
                .then(res => {
                    toast.success('Course Deleted Successfully ✨');
                    router.push('/user/courses')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <article className={classes.CourseCard}>
            <Link
                href={youtubeLink}
                target={'_blank'}
                passHref
            >
                <div className={classes.CourseCard_Image}>
                    <Image
                        src={src}
                        alt={title}
                        width={350}
                        height={300}
                        loading={"lazy"}
                    />
                </div>
            </Link>
            <Link
                href={youtubeLink}
                target={'_blank'}
                passHref
            >
                <h3>{title}</h3>
            </Link>
            <p className={classes.CourseCard_Description}>
                {description}
            </p>
            <div className={classes.Buttons}>
                <button onClick={EditHandler}>
                    <Image src={'/Images/icons/Edit.svg'} width={16} height={16}
                           alt={'Delete Icon'}/>Edit
                </button>
                <button onClick={RemoveHandler}>
                    <Image src={'/Images/icons/Delete.svg'} width={16} height={16} alt={'Delete Icon'}/>Delete
                </button>
            </div>
        </article>
    )
}
export default CourseCard