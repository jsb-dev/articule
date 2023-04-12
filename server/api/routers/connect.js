import connectController from '../controllers/connect.js';
import express from 'express';

const connectRouter = express.Router();

connectRouter.get('/', connectController);

export default connectRouter;
