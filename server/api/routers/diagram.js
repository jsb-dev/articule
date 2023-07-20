import express from 'express';
import getUserDiagram from '../controllers/diagram/get-user-diagram.js';
import getAllCategories from '../controllers/diagram/get-all-categories.js';
import processSaveDiagram from '../controllers/diagram/process-save-diagram.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getUserDiagram);
diagramRouter.get('/get/categories', getAllCategories);
diagramRouter.post('/post', processSaveDiagram);

export default diagramRouter;
