import React from "react";
import classes from "../../components/Pages/createProject/createProject.module.scss";
// React Imports
import Head from "next/head";

// IMPORTS
import CreateProjectContainer from "../../components/Pages/createProject/container/createProjectContainer";
// Authentication Helpers
import {verifyToken} from "../../helpers/Authentication_helpers";

function createProject() {
    return (
        <>
            <Head>
                <title>Create Project</title>
            </Head>
            <div
                className={[
                    "container min-vh-full py-6",
                    classes.CreateProject,
                ].join(" ")}
            >
                <CreateProjectContainer />
            </div>
        </>
    );
}

export default createProject;

export const getServerSideProps = async (ctx) => {
    // Check Authentication
    const { user } = verifyToken(ctx.req);
    // Check if the user is existed and the role is admin
    if(!user || user?.role !== 'admin'){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
};
