import createUserAccount from '../controllers/account/create-user-account.js';
import getAccountByEmail from '../controllers/account/get-account-by-email.js';
import accountIdExists from '../controllers/account/account-id-exists.js';
import express from 'express';

const accountRouter = express.Router();

accountRouter.post('/create', createUserAccount);
accountRouter.get('/check/email', getAccountByEmail);
accountRouter.get('/check/id', accountIdExists);

export default accountRouter;
