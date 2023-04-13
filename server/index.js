import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database/database.js';
import connectRouter from './api/routers/connect.js';
/*
import populateCategories from './database/populate/populateCategories.js';
import populateSurveys from './database/populate/populateSurveys.js';
import populateTopicCollections from './database/populate/populateTopicCollections.js';
*/

dotenv.config();

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
connection;
/*
populateCategories();
populateSurveys();
populateTopicCollections();
*/

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routers
app.use('/connect', connectRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
