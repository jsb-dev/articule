import express from 'express';
import getDiagram from '../controllers/diagram/getDiagram.js';
import getCategories from '../controllers/diagram/getCategories.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getDiagram);
diagramRouter.get('/get/categories', getCategories);

export default diagramRouter;
