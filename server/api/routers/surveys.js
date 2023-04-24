import express from 'express';
import getSurvey from '../controllers/survey/getSurvey.js';

const surveyRouter = express.Router();

surveyRouter.get('/get', getSurvey);

export default surveyRouter;
