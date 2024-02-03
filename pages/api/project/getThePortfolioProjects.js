import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getThePortfolioResult } from '../../../helpers/getTheResult';

const handler = nc();

dbConnect();

handler.get(async (req, res) => {
    const {result, projectLength} = await getThePortfolioResult(req.query);
    res.status(200).json({success: true, result: result, projectLength: projectLength});
});

export default handler;