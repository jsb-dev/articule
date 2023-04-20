import express from 'express';
import getDiagram from '../controllers/diagram/getDiagram.js';

const diagramRouter = express.Router();

diagramRouter.get('/get', getDiagram);

export default diagramRouter;
