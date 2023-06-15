import express from 'express';
import getUserDiagram from '../controllers/diagram/get-user-diagram.js';
import getAllCategories from '../controllers/diagram/get-all-categories.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getUserDiagram);
diagramRouter.get('/get/categories', getAllCategories);

export default diagramRouter;
