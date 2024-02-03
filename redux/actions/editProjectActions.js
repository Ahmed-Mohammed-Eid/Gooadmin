import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const editProject = createAsyncThunk(
    "projects/editProject",
    async (projectData) => {
        return axios
            .post("/api/project/editProject", projectData)
            .then((res) => {
                return res.data;
            })
            .catch((err) => err);
    }
);

export const UploadImageToCloudinary = createAsyncThunk(
    "projects/uploadImage",
    ({ImageFile, Save_Method_And_Place}) => {

        const formData = new FormData();
        formData.append("file", ImageFile);
        formData.append("upload_preset", Save_Method_And_Place);

        return axios
            .post(`https://api.cloudinary.com/v1_1/dkmhptvge/image/upload`, formData)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err
            });
    }
);

export const UploadVideoToCloudinary = createAsyncThunk(
    "projects/uploadVideo",
    ({VideoFile, Save_Method_And_Place}) => {
        const formData = new FormData();
        formData.append("file", VideoFile);
        formData.append("upload_preset", Save_Method_And_Place);

        return axios
            .post(`https://api.cloudinary.com/v1_1/dkmhptvge/video/upload`, formData)
            .then((res) => {
                return res;
            })
            .catch((err) => err);
    }
);