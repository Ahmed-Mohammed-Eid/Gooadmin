import Project from "../Model/Project";
import dbConnect from "../config/dbConnect";

export const getProjectById = async (id) => {
    dbConnect();

    const theProject = await Project.findById(id);
    return theProject
}