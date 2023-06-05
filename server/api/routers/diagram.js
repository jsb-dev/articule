import express from 'express';
import getDiagram from '../controllers/diagram/getDiagram.js';
import getCategories from '../controllers/diagram/getCategories.js';
import appendTopic from '../controllers/diagram/appendTopic.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getDiagram);
diagramRouter.get('/get/categories', getCategories);
diagramRouter.post('/append/topic', appendTopic);

export default diagramRouter;
