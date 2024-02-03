import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
// import the Actions
import {
    editProject
} from "../actions/editProjectActions";

const editProjectSlice = createSlice({
    name: "editProject",
    initialState: {
        nameOfCreator: null,
        nameOfProject: null,
        projectDescription: null,
        createdAtInReal: null,
        technologies: null,
        livePreviewLink: null,
        githubLink: null,
        published: null,
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
        },
        setTheDefaultData: (state, action) => {
            state[action.payload.nameOfCreatorKey] = action.payload.nameOfCreatorValue
            state[action.payload.nameOfProjectKey] = action.payload.nameOfProjectValue
            state[action.payload.projectDescriptionKey] = action.payload.projectDescriptionValue
            state[action.payload.createdAtInRealKey] = action.payload.createdAtInRealValue
            state[action.payload.technologiesKey] = action.payload.technologiesValue
            state[action.payload.livePreviewLinkKey] = action.payload.livePreviewLinkValue
            state[action.payload.githubLinkKey] = action.payload.githubLinkValue
            state[action.payload.publishedKey] = action.payload.publishedValue
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {...state, ...action.payload.Room};
        },
        [editProject.pending]: (state, action) => {
            state.pendingMessage = "Please wait while creating 🥺";
        },
        [editProject.fulfilled]: (state, action) => {
            state.successMessage = `${action.payload.message} 😊`;
        },
        [editProject.rejected]: (state, action) => {
            state.errorMessage = "Error Happen while creating a project 😭";
        },
    }
});

export const {onProjectFieldChange, ClearMessage, setTheDefaultData} = editProjectSlice.actions;

export default editProjectSlice;
