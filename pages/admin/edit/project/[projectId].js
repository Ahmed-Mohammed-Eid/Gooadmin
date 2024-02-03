import React from "react";
import classes from "../../../../components/Pages/editProject/editProject.module.scss";
// React Imports
import Head from "next/head";

// IMPORTS
import CreateProjectContainer from "../../../../components/Pages/editProject/container/createProjectContainer";
import {verifyToken} from "../../../../helpers/Authentication_helpers";
import {getProjectById} from "../../../../helpers/getProjectById";

function EditProject({project, projectId}) {
    return (
        <>
            <Head>
                <title>Edit Project</title>
            </Head>
            <div
                className={[
                    "container min-vh-full py-6",
                    classes.CreateProject,
                ].join(" ")}
            >
                <CreateProjectContainer project={project} projectId={projectId} />
            </div>
        </>
    );
}

export default EditProject;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Authentication check
    const {user} = verifyToken(ctx.req);
    // Get the post id from the url
    const {projectId} = ctx.params;
    // Get the post from the database
    const project = await getProjectById(projectId);
    // If post does not exist redirect to home page
    if (!project) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // console.log(project)

    // Check if the Post created by the same user or the editor is admin
    if (user.role === 'admin') {
        return {
            props: {
                project: JSON.stringify(project),
                projectId,
            },
        };
    }else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}

