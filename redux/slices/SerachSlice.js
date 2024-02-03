import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        searchKeyword: "",
        projectsResult: [],
        blogsResult: [],
        coursesResult: [],
        loading: false,
    },
    reducers: {
        setSearchKeyword(state, action) {
            state.searchKeyword = action.payload;
        },
        setProjectsResult(state, action) {
            state.projectsResult = action.payload;
        },
        setBlogsResult(state, action) {
            state.blogsResult = action.payload;
        },
        setCoursesResult(state, action) {
            state.coursesResult = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setLoading, setSearchKeyword, setProjectsResult, setBlogsResult, setCoursesResult} = SearchSlice.actions;

export default SearchSlice;
