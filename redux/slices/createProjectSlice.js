import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
// import the Actions
import {
    createProject
} from "../actions/createProjectActions";

const createProjectSlice = createSlice({
    name: "createProject",
    initialState: {
        nameOfCreator: null,
        nameOfProject: null,
        projectDescription: null,
        createdAtInReal: null,
        technologies: null,
        livePreviewLink: null,
        githubLink: null,
        published: true,
        successMessage: null,
        errorMessage: null,
        pendingMessage: null,
    },
    reducers: {
        onProjectFieldChange: (state, action) => {
            state[action.payload.inputName] = action.payload.value
        },
        ClearMessage: (state, action) => {
            state[action.payload.messageType] = null;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {...state, ...action.payload.Room};
        },
        [createProject.pending]: (state, action) => {
            state.pendingMessage = "Please wait while creating 🥺";
        },
        [createProject.fulfilled]: (state, action) => {
            if(!action.payload.message){
                state.successMessage = `${action.payload.data.message} 😊`;
            }else {
                state.errorMessage = `${action.payload.message} 😭`;
            }
        },
        [createProject.rejected]: (state, action) => {
            state.errorMessage = "Error Happen while creating a project 😭";
        },
    }
});

export const {onProjectFieldChange, ClearMessage} = createProjectSlice.actions;

export default createProjectSlice;
