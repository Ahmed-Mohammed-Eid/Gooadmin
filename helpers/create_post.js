//Components
import React from "react";
//Modal
import Post from '../Model/Post';


async function create_post(req, res) {

    // GET THE USER DATA FROM THE REQUEST OBJECT
    const userData = req?.userData;
    console.log("USER DATA: ", userData);

    try {
        // CREATE A DATA OBJECT WITH THE USER DATA AND THE BODY DATA
        const data = {
            ...req.body,
            Author: {
                AuthorName: userData.user.firstName + " " + userData.user.lastName,
                AuthorImage: {
                    url: userData.user.userImage.url,
                    public_id: userData.user.userImage._id
                }
            }
        }

        // ADD A VALIDATION FOR THE USER DATA IN THAT WILL BE SAVED IN THE DATABASE
        // IF THE USER DATA IS NOT VALID, AN ERROR WILL BE THROWN
        if (userData.user.firstName === undefined || userData.user.lastName === undefined || userData.user.userImage.url === undefined || userData.user.userImage._id === undefined) {
            return res.status(500).json({message: "The User Data is not valid"});
        }

        // create a new project with the data in body
        await Post.create(data);
        // send a response that everything went wrong
        res.status(201).json({
            message: "Post has created!",
            data: data,
        });
    } catch (error) {
        // The errors from the server
        const errorsObject = error.errors;
        const errorsArray = [];

        // check if there are errors
        if (errorsObject) {
            // put all messages in array
            for (const property in errorsObject) {
                errorsArray.push(errorsObject[property].message);
            }
        }

        // Send the error message && Array of errors message
        res.status(500).json({message: error.message, errorsArray});
    }
}

export default create_post;

/************************************************************************/
// What we return
/************************************************************************/
/*
Success: {
    [1]: message,
    [2]: Post data
}

Fail: {
    [1]: error message,
    [2]: fields error messages array 
}
*/