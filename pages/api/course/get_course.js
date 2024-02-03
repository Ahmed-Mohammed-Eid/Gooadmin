import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import Course from "../../../Model/Course";

//Create the handler
const handler = nc();
//Connect to DB
dbConnect();
//Handle the GET req
handler.get(async (req, res) => {
    // Get the Course ID from the query
    const {ID} = req.query;
    // GET THE COURSE BASED ON THE ID
    const course = await Course.findById(ID);
    // RESPONSE
    if (course) {
        res.status(200).json({course})
    } else {
        res.status(404).json({message: 'Course is equal to ' + course})
    }
});

export default handler;