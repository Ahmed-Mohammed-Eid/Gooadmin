import React, {useState, useRef, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import classes from "../../styles/Search.module.scss";
//Helpers Imports
import axios from "axios";
// Import Router
import {useRouter} from "next/router";
//Imports
import BlogCardSkelton from "../../components/layout/BlogCard/BlogCard_Skelton/BlogCard_Skelton";
import CourseCard from "../../components/layout/CourseCard/CourseCard";
import SendIcon from "../../components/layout/ImagesIcons/SendIcon";
import SearchResult from "../../components/layout/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {
    setSearchKeyword,
    setProjectsResult,
    setCoursesResult,
    setBlogsResult,
    setLoading
} from '../../redux/slices/SerachSlice';
import {toast} from "react-toastify";
import Spinner from "../../components/layout/Spinner";

const Search = () => {
    // Get the router
    const router = useRouter();

    // REDUX
    const dispatch = useDispatch();
    const {searchKeyword, projectsResult, blogsResult, coursesResult, loading} = useSelector((state) => state.search);

    const handleSearch = (e) => {
        // Prevent Default
        e.preventDefault();
        // Check if there's a valid keyword;
        if (!searchKeyword || searchKeyword.trim() === "") {
            toast.error("Please Enter a Valid Search Term 😢");
            return;
        }
        // handle search logic here
        dispatch(setLoading(true));
        // Test
        axios
            .get(`/api/search`, {
                params: {
                    keyword: searchKeyword,
                },
            })
            .then((res) => {
                dispatch(setLoading(false));
                // Set the projects in the state
                dispatch(setProjectsResult(res.data.projects));
                // Set the posts in the state
                dispatch(setBlogsResult(res.data.posts))
                // Set the courses in the state
                dispatch(setCoursesResult(res.data.courses));
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    return (
        <>
            <Head>
                <title>Courses</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <section className={classes.ContentFilter}>
                        <div className={classes.Filter}>
                            <div className={classes.Filter_Search}>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    name={"search"}
                                    value={searchKeyword}
                                    onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className={classes.Filter_Apply}
                            >
                                <SendIcon/> {loading ? <Spinner size={1.5} color={"#ffffff"}/> : "Search"}

                            </button>
                        </div>
                    </section>
                    <section className={classes.ContentCards}>
                        <div className={classes.Cards_Container}>
                            {/* Projects */}
                            {projectsResult.length > 0 && (
                                projectsResult.map((project) => {
                                    return (
                                        <SearchResult
                                            key={project._id}
                                            date={new Date(project.createdOnServerAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                            category={'Project'}
                                            header={project.nameOfProject}
                                            imageSrc={project?.mainImage?.url}
                                            link={`/project/${project._id}`}
                                            target={"_self"}
                                        />
                                    )
                                })
                            )}
                            {/* Posts */}
                            {blogsResult.length > 0 && (
                                blogsResult.map((post) => {
                                    return (
                                        <SearchResult
                                            key={post._id}
                                            date={new Date(post.createdOnServerAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                            category={'Post'}
                                            header={post.header}
                                            imageSrc={post?.mainImage?.url}
                                            link={`/post/${post._id}`}
                                            target={"_self"}
                                        />
                                    )
                                }))}
                            {/* Courses */}
                            {coursesResult.length > 0 && (
                                coursesResult.map((course) => {
                                    return (
                                        <SearchResult
                                            key={course._id}
                                            date={new Date(course.createdOnServerAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                            category={'Course'}
                                            header={course.title}
                                            imageSrc={course?.imageUrl}
                                            link={`${course.youtubeLink}`}
                                            target={"_blank"}
                                        />
                                    )
                                }))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Search;