import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {ResetPassword} from '../../../helpers/resetPasswordHelpers';



const handler = nc();

dbConnect();

handler.put(ResetPassword);

export default handler;
