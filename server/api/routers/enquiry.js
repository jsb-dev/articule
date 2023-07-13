import processUserContact from '../controllers/enquiry/process-user-contact.js';
import express from 'express';

const enquiryRouter = express.Router();

enquiryRouter.post('/contact', processUserContact);

export default enquiryRouter;
