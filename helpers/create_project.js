import Project from "../Model/Project";

async function create_project(req, res) {
    try {
        //##################################################################
        // SET THE PROJECT DATA WITH THE UPLOADED IMAGES
        //##################################################################
        const projectData = {
            ...req.body,
        }

        //##################################################################
        // CREATE THE PROJECT
        //##################################################################
        // create a new project with the data in body
        await Project.create(projectData);
        // send a response that everything went wrong
        res.status(201).json({
            message: "Project has created! 😊",
        });
    } catch (error) {
        // Send the error message && Array of errors message
        res.status(500).json({ message: 'OOPS, Something Went Wrong 😭', error: error.message });
    }
}

export default create_project;

/************************************************************************/
// What we return
/************************************************************************/
/*
Success: {
    [1]: message,
    [2]: project data
}

Fail: {
    [1]: error message,
}
*/
