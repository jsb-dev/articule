import express from 'express';
import getDiagram from '../controllers/diagram/getDiagram.js';
import getCategory from '../controllers/diagram/getCategory.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getDiagram);
diagramRouter.get('/get/category', getCategory);

export default diagramRouter;
