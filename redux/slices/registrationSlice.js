import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const registerationSlice = createSlice({
    name: "registeration",
    initialState: {
        UI: null,
        UE: null,
    },
    reducers: {
        setU_Info: (state, action) => {
            state.UI = action.payload.UI;
            state.UE = action.payload.UE;
        },
    },
    extraReducers: {},
});

export const { setU_Info } = registerationSlice.actions;

export default registerationSlice;
