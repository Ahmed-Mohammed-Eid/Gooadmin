import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';
import { createContactMessage } from '../../helpers/contactMessage';

const handler = nc();

dbConnect();

handler.post(createContactMessage);

export default handler;