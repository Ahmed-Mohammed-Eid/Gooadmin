import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getTheCoursesResult } from '../../../helpers/getTheResult';

const handler = nc();

dbConnect();

handler.get(async (req, res) => {
    const {result, coursesLength} = await getTheCoursesResult(req.query);
    res.status(200).json({success: true, result: result, coursesLength: coursesLength});
});

export default handler;