import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import {getSearchResult} from '../../../helpers/getHomePageData';

//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the get Function
handler.get(getSearchResult);

export default handler;