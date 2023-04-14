import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database/database.js';
import accountRouter from './api/routers/account.js';
import populateCategories from './database/utils/populateCategories.js';
// import populateSurveys from './database/utils/populateSurveys.js';

dotenv.config();

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
connection;
// populateCategories();
// populateSurveys();

// CORS
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routers
app.use('/account', accountRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
