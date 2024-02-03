import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
    "projects/createPost",
    async (postData) => {
        return axios
            .post("/api/post/createPost", postData)
            .then((res) => {
                return res;
            })
            .catch((err) => err);
    }
);