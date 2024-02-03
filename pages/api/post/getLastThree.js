import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import { getPostsAndProjectsAndCourses } from '../../../helpers/getHomePageData';

dbConnect();

const handler = nc();

handler.get(getPostsAndProjectsAndCourses);

export default handler;