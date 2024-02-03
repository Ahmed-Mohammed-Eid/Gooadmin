import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

// Import Reducers
import LayoutSlice from "./slices/LayoutSlice";
import createProjectSlice from "./slices/createProjectSlice";
import createPostSlice from "./slices/createPostSlice";
import registerationSlice from "./slices/registrationSlice";
import editProjectSlice from "./slices/editProjectSlice";
import SearchSlice from "./slices/SerachSlice";

// Put All Reducers Together
const AllReducers = {
  reducer: {
    [LayoutSlice.name]: LayoutSlice.reducer,
    [createProjectSlice.name]: createProjectSlice.reducer,
    [createPostSlice.name]: createPostSlice.reducer,
    [registerationSlice.name]: registerationSlice.reducer,
    [editProjectSlice.name]: editProjectSlice.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
  },
};

// Make the Store with All Reducers
const makeStore = () => configureStore(AllReducers);

//  Create the next Wrapper to apply the store
export const wrapper = createWrapper(
  makeStore,
  applyMiddleware(composeWithDevTools)
);
