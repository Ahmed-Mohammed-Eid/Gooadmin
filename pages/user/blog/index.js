import {useState, useRef, useEffect} from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import classes from "../../../styles/Blog.module.scss";
//Helpers Imports
import {categories} from "../../../helpers/ListsForMultiSelectsData";
// Import Router
import {useRouter} from "next/router";
//Imports
import BlogCardAdmin from "../../../components/layout/BlogCard/BlogCardAdmin";
import BlogCardSkelton from "../../../components/layout/BlogCard/BlogCard_Skelton/BlogCard_Skelton";
import SendIcon from "../../../components/layout/ImagesIcons/SendIcon";
import Pagination from "../../../components/layout/Pagination/Pagination";
// Authentication Helpers
import {verifyToken} from "../../../helpers/Authentication_helpers";

const UserBlog = ({user, isAuthenticated, ID}) => {
        // Get the router
        const router = useRouter();

        //The State Of The Filter Data
        const [filterData, setFilterData] = useState({
            category: [],
            publishedDate: "",
        });

        // The State of Blog Posts
        const [blogPosts, setBlogPosts] = useState({
            result: null,
            postLength: 0,
        });

        // Effect for sending a request to api to get data
        useEffect(() => {
            // Get the query from the url
            const {search, page, categories, time} = router.query;
            let params = {
                search: search,
                page: page,
                categories: categories,
                time: time,
            }
            if(user?.role === 'user'){
                params = {...params, ID}
            }
            // Fetch data from database
            axios
                .get(`/api/post/getTheBlogPosts`, {
                    params: params,
                })
                .then((res) => {
                    setBlogPosts({
                        result: res.data.result,
                        postLength: res.data.postLength,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }, [router.query]);

        // Reference To The Filter Search text
        const filterSearchText = useRef("");

        // Set a number to load the categories based on the number
        const [numberOfCategories, setNumberOfCategories] = useState(11);
        // Make a copy of the categories to render them
        const categoriesList = categories.map((category, index) => {
            if (index < numberOfCategories) {
                return (
                    <button
                        onClick={(event) => toggleCategory(event, category)}
                        className={[
                            classes.Category_Item,
                            filterData.category.includes(category)
                                ? classes.Active
                                : "",
                        ].join(" ")}
                        key={"Kc" + index}
                    >
                        {category}
                    </button>
                );
            }
        });

        // Change the number of categories to load
        function toggleCategoriesNumber() {
            if (numberOfCategories !== categories.length) {
                setNumberOfCategories(categories.length);
            } else {
                setNumberOfCategories(11);
            }
        }

        // Function for adding the category to the filter data
        function toggleCategory(event, category) {
            // Check if the category is already in the filter data
            if (filterData.category.includes(category)) {
                //Remove the active class from the button
                event.target.classList.remove(classes.Active);
                // Remove the category from the filter data
                const newCategory = filterData.category.filter(
                    (item) => item !== category
                );
                setFilterData({...filterData, category: newCategory});
            } else {
                //Add the active class from the button
                event.target.classList.add(classes.Active);
                // Add the category to the filter data
                setFilterData({
                    ...filterData,
                    category: [...filterData.category, category],
                });
            }
        }

        // Function for toggle the Date and  add Active class to the clicked button and remove it from the siblings
        function toggleDate(event) {
            // Remove the active class from the siblings
            event.target.parentElement.childNodes.forEach((child) => {
                child.classList.remove(classes.Active);
            });
            // Add the active class to the clicked button
            event.target.classList.add(classes.Active);
            // Add the date to the filter data
            setFilterData({...filterData, publishedDate: event.target.value});
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
                    categories: `${filterData.category}`,
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
                if (currentPage === Math.ceil(blogPosts.postLength / 10)) {
                    return;
                }
                // Add 1 to the page number
                router.push({
                    pathname: router.pathname,
                    query: {...router.query, page: currentPage + 1},
                });
            } else if (value === "previous") {
                // Check if the current page is the first page
                if (currentPage === 1) {
                    return;
                }
                // Remove 1 from the page number
                router.push({
                    pathname: router.pathname,
                    query: {...router.query, page: currentPage - 1},
                });
            } else if (value === "first") {
                // Check if the current page is the first page
                if (currentPage === 1) {
                    return;
                }
                // Go to the first page
                router.push({
                    pathname: router.pathname,
                    query: {...router.query, page: 1},
                });
            } else if (value === "last") {
                // Check if the current page is the last page
                if (currentPage === Math.ceil(blogPosts.postLength / 10)) {
                    return;
                }
                // Go to the last page
                router.push({
                    pathname: router.pathname,
                    query: {...router.query, page: Math.ceil(blogPosts.postLength / 10)},
                });
            } else {
                // Go to the page number
                router.push({
                    pathname: router.pathname,
                    query: {...router.query, page: value},
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
                    <title>Blog</title>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                </Head>
                <div className={"container"}>
                    <div className={classes.ContentContainer}>
                        <section className={classes.ContentFilter}>
                            {isAuthenticated && user && <button onClick={() => router.push('/admin/createPost')} className={classes.Create_Button}>Create post <Image
                                src={'/Images/icons/create.svg'} width={20} height={20} alt={'Creat Icon'}/></button>}
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
                                <div className={classes.Filter_Category}>
                                    <div className={classes.Category_Container}>
                                        {categoriesList}
                                    </div>
                                    <button
                                        className={classes.Category_Button}
                                        onClick={toggleCategoriesNumber}
                                    >
                                        {numberOfCategories < categories.length
                                            ? `Load All`
                                            : `Show Less`}
                                    </button>
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
                                    <SendIcon/> Apply
                                </button>
                            </div>
                        </section>
                        <section className={classes.ContentCards}>
                            <h1>
                                <Image
                                    src={"/Images/icons/Blog.svg"}
                                    width={38}
                                    height={38}
                                    alt={"BLOG"}
                                />{" "}
                                BLOG
                            </h1>
                            <div className={classes.Cards_Container}>
                                {blogPosts.result ? (
                                        blogPosts.result.map(({mainImage, category, header, _id, userId}) => {
                                                return (
                                                    <BlogCardAdmin
                                                        key={_id}
                                                        id={_id}
                                                        src={mainImage.url}
                                                        title={header}
                                                        categories={category}
                                                        creatorId={userId}
                                                    />
                                                );
                                            }
                                        )
                                    ) :
                                    (
                                        <>
                                            <BlogCardSkelton/>
                                            <BlogCardSkelton/>
                                            <BlogCardSkelton/>
                                            <BlogCardSkelton/>
                                        </>
                                    )
                                }
                            </div>
                            {blogPosts.postLength > 10 && (
                                <Pagination
                                    itemsNumber={blogPosts.postLength}
                                    itemsPerPage={10}
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
    }
;

export default UserBlog;

export const getServerSideProps = async ({req}) => {
    // Authentication check
    const {user} = verifyToken(req);

    // GET THE USER ID
    if (!user || !user._id) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // Pass the ID to the Page
    return {
        props: {
            ID: user._id
        },
    };
};