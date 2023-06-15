// PopulateCategories.js
// This function must run first (before PopulateSurveys.js and PopulateTopicCollections.js)
// This is a function to populate the database with the json data from "../data/categories.json"
// Each entry in the json file must be entered in the database as a Category from "../schema/Category.js"
// The fields for each Category are categoryName, categoryBrief and surveys
// For each Category, the surveys field must be an array of surveyIds
// This must be found by querying the database for all Surveys with the same categoryName as the Category
// The database connection is made in "../database.js" and exports as connection
// Before adding any of these entries to the database, the function must first check if these entries already exist
// If they do, the function should not add them again

// PopulateCategories.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Category from '../models/Category.js';
import Survey from '../models/Survey.js'; // Import the Survey model

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const categoriesDataPath = path.join(
  __dirname,
  '..',
  'data',
  'categories.json'
);
const categoriesData = JSON.parse(fs.readFileSync(categoriesDataPath, 'utf8'));

async function populateCategories() {
  console.log('Populating categories...');

  for (const categoryData of categoriesData) {
    const categoryExists = await Category.findOne({
      categoryName: categoryData.categoryName,
    });

    if (!categoryExists) {
      const surveysWithCategory = await Survey.find({
        categoryName: categoryData.categoryName,
      });

      const surveyIds = surveysWithCategory.map((survey) => survey._id);

      const newCategory = new Category({
        categoryName: categoryData.categoryName,
        categoryBrief: categoryData.categoryBrief,
        surveys: surveyIds,
      });

      try {
        await newCategory.save();
        console.log(`Category "${newCategory.categoryName}" added.`);
      } catch (error) {
        console.error(
          `Error adding category "${newCategory.categoryName}":`,
          error.message
        );
      }
    } else {
      console.log(`Category "${categoryData.categoryName}" already exists.`);
    }
  }

  console.log('Finished populating categories.');
}

export default populateCategories;
