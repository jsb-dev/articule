import createAccount from '../controllers/account/createAccount.js';
import checkAccount from '../controllers/account/checkAccount.js';
import express from 'express';

const accountRouter = express.Router();

accountRouter.post('/create', createAccount);
accountRouter.post('/check', checkAccount);

export default accountRouter;
