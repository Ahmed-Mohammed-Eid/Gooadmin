
//Redux
import {HYDRATE} from "next-redux-wrapper";
import {createSlice} from "@reduxjs/toolkit";

//


const createPostSlice = createSlice({
    name: "createPost",
    initialState: {
        heading: null,
        categories: null,
        checked: true,
        ErrorMessage: null,
        SuccessMessage: null,
        PendingMessage: null
    },
    reducers: {
        onPostElementChange: (state, action) => {
            state[action.payload.title] = action.payload.value
        },
        onPending: (state, action) => {
            state.PendingMessage = action.payload.value
        },
        onError: (state, action) => {
            state.ErrorMessage = action.payload.value
        },
        OnSuccess: (state, action) => {
          state.SuccessMessage = action.payload.value
        },
        ClearError: (state, action) => {
            state.ErrorMessage = null;
            state.SuccessMessage = null;
            state.PendingMessage = null
        }
    },
    extraReducers:{}
})

export  const {onPostElementChange, onPending, OnSuccess, onError, ClearError} = createPostSlice.actions;

export default createPostSlice;