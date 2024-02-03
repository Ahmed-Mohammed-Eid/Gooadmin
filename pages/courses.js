import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import classes from "../styles/Blog.module.scss";
//Helpers Imports
import axios from "axios";
// Import Router
import { useRouter } from "next/router";
//Imports
import BlogCardSkelton from "../components/layout/BlogCard/BlogCard_Skelton/BlogCard_Skelton";
import CourseCard from "../components/layout/CourseCard/CourseCard";
import SendIcon from "../components/layout/ImagesIcons/SendIcon";
import Pagination from "../components/layout/Pagination/Pagination";

const Courses = () => {
    // Get the router
    const router = useRouter();

    //The State Of The Filter Data
    const [filterData, setFilterData] = useState({
        publishedDate: "",
    });

    // The State of Blog Posts
    const [courses, setCourses] = useState({
        result: null,
        coursesLength: 0,
    });

    // Effect for sending a request to api to get data
    useEffect(() => {
        // Get the query from the url
        const { search, page, categories, time } = router.query;

        // Fetch data from database
        axios
            .get(`/api/course/getTheCourses`, {
                params: {
                    search: search,
                    page: page,
                    categories: categories,
                    time: time,
                },
            })
            .then((res) => {
                // console.log(res)
                setCourses({
                    result: res.data.result,
                    coursesLength: res.data.coursesLength,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [router.query]);

    // Reference To The Filter Search text
    const filterSearchText = useRef("");


    // Function for toggle the Date and  add Active class to the clicked button and remove it from the siblings
    function toggleDate(event) {
        // Remove the active class from the siblings
        event.target.parentElement.childNodes.forEach((child) => {
            child.classList.remove(classes.Active);
        });
        // Add the active class to the clicked button
        event.target.classList.add(classes.Active);
        // Add the date to the filter data
        setFilterData({ ...filterData, publishedDate: event.target.value });
    }

    // Function when the user click on the search button to add query to the url
    function search() {
        // Get the value of the input
        const value = filterSearchText.current.value;
        // Add the query to the url
        router.push({
            pathname: router.pathname,
            query: {
                search: value,
                categories: filterData.category,
                date: filterData.publishedDate,
            },
        });
    }

    //Function for adding or removing 1 from the page query in the url
    function changePage(event) {
        // Get the value of the button
        const value = event.target.value;
        // Get the current page number
        const currentPage = router.query.page ? parseInt(router.query.page) : 1;
        // Check if the value is next or previous
        if (value === "next") {
            // Check if the current page is the last page
            if (currentPage === Math.ceil(courses.coursesLength / 4)) {
                return;
            }
            // Add 1 to the page number
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: currentPage + 1 },
            });
        } else if (value === "previous") {
            // Check if the current page is the first page
            if (currentPage === 1) {
                return;
            }
            // Remove 1 from the page number
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: currentPage - 1 },
            });
        } else if (value === "first") {
            // Check if the current page is the first page
            if (currentPage === 1) {
                return;
            }
            // Go to the first page
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: 1 },
            });
        } else if (value === "last") {
            // Check if the current page is the last page
            if (currentPage === Math.ceil(courses.coursesLength / 4)) {
                return;
            }
            // Go to the last page
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: Math.ceil(courses.coursesLength / 4) },
            });
        } else {
            // Go to the page number
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: value },
            });
        }
    }

    // Function to toggle the filter
    function toggleFilter() {
        // Get the filter element
        const filter = document.querySelector(`.${classes.Filter}`);
        // Check if the filter is open or not
        if (filter.classList.contains(classes.Open)) {
            // Close the filter
            filter.classList.remove(classes.Open);
        } else {
            // Open the filter
            filter.classList.add(classes.Open);
        }
    }

    return (
        <>
            <Head>
                <title>GooAdmin Courses</title>
                <meta name="description" content="Explore our wide range of courses on software development and education."/>
                <meta name="keywords" content="courses, gooadmin, software development, education services"/>
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <section className={classes.ContentFilter}>
                        <div className={classes.Filter}>
                            <button
                                onClick={toggleFilter}
                                className={classes.Toggle_Filter}
                            >
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                                <p>Filter</p>
                            </button>
                            <div className={classes.Filter_Search}>
                                <input
                                    ref={filterSearchText}
                                    type='text'
                                    placeholder='Search'
                                    name={"search"}
                                />
                            </div>
                            <div className={classes.Filter_Date}>
                                <div className={classes.Date_Container}>
                                    <button
                                        onClick={(event) => toggleDate(event)}
                                        value={"all"}
                                        className={classes.Date_Item}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={(event) => toggleDate(event)}
                                        value={"last month"}
                                        className={classes.Date_Item}
                                    >
                                        Last Month
                                    </button>
                                    <button
                                        onClick={(event) => toggleDate(event)}
                                        value={"last year"}
                                        className={classes.Date_Item}
                                    >
                                        Last Year
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={search}
                                className={classes.Filter_Apply}
                            >
                                <SendIcon /> Apply
                            </button>
                        </div>
                    </section>
                    <section className={classes.ContentCards}>
                        <h1>
                            <Image
                                src={"/Images/Home/Courses.svg"}
                                width={38}
                                height={38}
                                alt={"BLOG"}
                            />{" "}
                            COURSES
                        </h1>
                        <div className={classes.Cards_Container}>
                            {courses.result ? (
                                courses.result.map(
                                    (
                                        { title, imageUrl, description, youtubeLink, _id },
                                        index
                                    ) => {
                                        return (
                                            <Link
                                                key={_id}
                                                href={youtubeLink}
                                                target={'_blank'}
                                                passHref
                                            >
                                                <a target={'_blank'} className={classes.Card_Link}>
                                                    <CourseCard
                                                        src={imageUrl}
                                                        title={title}
                                                        description={description}
                                                    />
                                                </a>
                                            </Link>
                                        );
                                    }
                                )
                            ) : (
                                <>
                                    <BlogCardSkelton />
                                    <BlogCardSkelton />
                                    <BlogCardSkelton />
                                    <BlogCardSkelton />
                                </>
                            )}
                        </div>
                        {courses.coursesLength > 4 && (
                            <Pagination
                                itemsNumber={courses.coursesLength}
                                itemsPerPage={4}
                                start
                                end
                                onPaginate={changePage}
                            />
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Courses;