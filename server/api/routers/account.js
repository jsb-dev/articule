import createAccount from '../controllers/account/createAccount.js';
import checkAccount from '../controllers/account/checkAccountEmail.js';
import checkAccountId from '../controllers/account/checkAccountId.js';
import express from 'express';

const accountRouter = express.Router();

accountRouter.post('/create', createAccount);
accountRouter.get('/check/email', checkAccount);
accountRouter.get('/check/id', checkAccountId);

export default accountRouter;
