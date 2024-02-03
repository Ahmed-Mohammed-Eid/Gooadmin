import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getTheResult } from '../../../helpers/getTheResult';

const handler = nc();

dbConnect();

handler.get(async (req, res) => {
    const {result, postLength} = await getTheResult(req.query);
    res.status(200).json({success: true, result: result, postLength: postLength});
});

export default handler;