import express from 'express';
import getSurveyById from '../controllers/survey/get-survey-by-id.js';

const surveyRouter = express.Router();

surveyRouter.get('/get', getSurveyById);

export default surveyRouter;
