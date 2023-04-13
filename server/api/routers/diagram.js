import express from 'express';

const diagramRouter = express.Router();

diagramRouter.get('/category/categoryName', GetCategoryName);

export default diagramRouter;
