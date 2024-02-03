import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const LayoutSlice = createSlice({
    name: "Layout",
    initialState: {
        showSearchInput: false,
        showOverlay: false,
        showAside: false,
        showNavbarOptions: false,
        showProjectTechnologies: false,
        showBlogCategories: false,
    },
    reducers: {
        ToggleAside: (state) => {
            state.showOverlay = !state.showOverlay;
            state.showAside = !state.showAside;
        },
        ToggleNavbarOptions: (state) => {
            state.showOverlay = !state.showOverlay;
            state.showNavbarOptions = !state.showNavbarOptions;
        },
        OpenProjectTechnologies: (state) => {
            state.showOverlay = true;
            state.showProjectTechnologies = true;
        },
        CloseProjectTechnologies: (state) => {
            state.showOverlay = false;
            state.showProjectTechnologies = false;
        },
        OpenBlogCategories: (state) => {
            state.showOverlay = true;
            state.showBlogCategories = true;
        },
        CloseBlogCategories: (state) => {
            state.showOverlay = false;
            state.showBlogCategories = false;
        },
        showSearchInput: (state) => {
            state.showOverlay = true;
            state.showSearchInput = true;
        },
        CloseAll: (state) => {
            state.showOverlay = false;
            state.showAside = false;
            state.showNavbarOptions = false;
            state.showProjectTechnologies = false;
            state.showSearchInput = false;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return { ...state, ...action.payload.Room };
        },
    },
});

export const {showSearchInput, ToggleAside, ToggleNavbarOptions, CloseAll, OpenProjectTechnologies, CloseProjectTechnologies, OpenBlogCategories, CloseBlogCategories } = LayoutSlice.actions;

export default LayoutSlice;
