// Search.jsx

import React, { useRef } from "react";
import {useRouter} from "next/router";
import classes from "./GlobalSearch.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
// Redux
import { CloseAll } from "../../../redux/slices/LayoutSlice";
import {setBlogsResult, setCoursesResult, setProjectsResult, setSearchKeyword, setLoading} from '../../../redux/slices/SerachSlice';

const Search = () => {

    // Router
    const router = useRouter();

    // Refs
    const inputRef = useRef();

    // Dispatcher
    const dispatch = useDispatch();
    // State REDUX
    const { showSearchInput, showOverlay } = useSelector(
        (state) => state.Layout
    );

    const {searchKeyword, loading} = useSelector((state) => state.search);

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

                // Close the search input and the overlay and redirect to the search page
                dispatch(CloseAll());
                // Redirect to the search page
                router.push('/search');
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    };

    return (
        <div
            className={[
                classes.Search,
                !showOverlay && !showSearchInput ? classes.Hidden : "",
            ].join(" ")}
        >
            <h2>Search in the Website</h2>
            <p>
                The Search will be in{" "}
                <span className='highlighted'>Projects</span>,{" "}
                <span className='highlighted'>Blog</span> and{" "}
                <span className='highlighted'>Courses</span>
            </p>
            <form>
                <div className={classes.Search_Part}>
                    <input
                        ref={inputRef}
                        className={classes.Search__input}
                        type='text'
                        placeholder='Search...'
                        value={searchKeyword}
                        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
                    />
                    <button
                        className={classes.Search__button}
                        onClick={handleSearch}
                        style={{
                            backgroundColor: loading
                                ? "var(--main-color)"
                                : "#e8e8e8",
                            color: loading ? "#ffffff" : "#000000",
                        }}
                    >
                        Search{" "}
                        {loading && <Spinner size={1.5} color={"#ffffff"} />}
                    </button>
                </div>
            </form>
            {/*{(searchResultPosts.length > 0 ||*/}
            {/*    searchResultProjects.length > 0 || searchResultCourses.length > 0) && (*/}
            {/*    <div className={classes.Results}>*/}
            {/*        {searchResultProjects && searchResultProjects.length > 0*/}
            {/*            ? searchResultProjects.map((project) => {*/}
            {/*                  return (*/}
            {/*                      <Link*/}
            {/*                          href={`/project/${project._id}`}*/}
            {/*                          passHref*/}
            {/*                          key={project._id}*/}
            {/*                      >*/}
            {/*                          <a onClick={() => dispatch(CloseAll())}>*/}
            {/*                              <div className={classes.Results_Item}>*/}
            {/*                                  <h2>{project.nameOfProject}</h2>*/}
            {/*                                  <p>Project</p>*/}
            {/*                              </div>*/}
            {/*                          </a>*/}
            {/*                      </Link>*/}
            {/*                  );*/}
            {/*              })*/}
            {/*            : null}*/}
            {/*        {searchResultPosts && searchResultPosts.length > 0*/}
            {/*            ? searchResultPosts.map((post) => {*/}
            {/*                  return (*/}
            {/*                      <Link*/}
            {/*                          href={`/post/${post._id}`}*/}
            {/*                          passHref*/}
            {/*                          key={post._id}*/}
            {/*                      >*/}
            {/*                          <a onClick={() => dispatch(CloseAll())}>*/}
            {/*                              <div className={classes.Results_Item}>*/}
            {/*                                  <h2>{post.header}</h2>*/}
            {/*                                  <p>Post</p>*/}
            {/*                              </div>*/}
            {/*                          </a>*/}
            {/*                      </Link>*/}
            {/*                  );*/}
            {/*              })*/}
            {/*            : null}*/}
            {/*        {searchResultCourses && searchResultCourses.length > 0*/}
            {/*            ? searchResultCourses.map((course) => {*/}
            {/*                  return (*/}
            {/*                      <Link*/}
            {/*                          href={course.youtubeLink}*/}
            {/*                          passHref*/}
            {/*                          key={course._id}*/}
            {/*                      >*/}
            {/*                          <a target={'_blank'} onClick={() => dispatch(CloseAll())}>*/}
            {/*                              <div className={classes.Results_Item}>*/}
            {/*                                  <h2>{course.title}</h2>*/}
            {/*                                  <p>Course</p>*/}
            {/*                              </div>*/}
            {/*                          </a>*/}
            {/*                      </Link>*/}
            {/*                  );*/}
            {/*              })*/}
            {/*            : null}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Search;
