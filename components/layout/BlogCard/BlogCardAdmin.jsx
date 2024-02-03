import React from "react";
import Link from "next/link";
// Style
import classes from "./BlogCardAdmin.module.scss";
// Imports
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

function BlogCard({src, title, categories, id, creatorId}) {
    // ROUTER
    const router = useRouter();

    // FUNCTIONS
    const EditHandler = () => {
        router.push(`/admin/edit/post/${id}`);
    }

    const RemoveHandler = () => {
        if (window.confirm(`The Post With the Title "${title}" will be removed. Are you Sure you want to delete it?`)) {
            axios.delete(`/api/post/DeletePostApi?ID=${id}&creatorId=${creatorId}`)
                .then(res => {
                    toast.success('Post Deleted Successfully ✨');
                    router.push('/user/blog')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <article className={classes.BlogCard}>
            <Link
                href={`/post/${id}`}
                passHref
            >
                <div className={classes.BlogCard_Image}>
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
                href={`/post/${id}`}
                passHref
            >
                <h3>{title}</h3>
            </Link>
            <div className={classes.BlogCard_CategoriesContainer}>
                {categories.map((category) => (
                    <span className={classes.BlogCard_Category} key={category}>{category}</span>
                ))}
            </div>
            <div className={classes.Buttons}>
                <button onClick={EditHandler}><Image src={'/Images/icons/Edit.svg'} width={16} height={16} alt={'Edit Icon'}/>Edit</button>
                <button onClick={RemoveHandler}><Image src={'/Images/icons/Delete.svg'} width={16} height={16} alt={'Delete Icon'}/>Delete
                </button>
            </div>
        </article>
    );
}

export default BlogCard;
