// PopulateSurveys.js
// This function must run second (after PopulateCategories.js and before PopulateTopicCollections.js)
// This is a function to populate the database with the json data from "../data/surveys.json"
// Each entry in the json file must be entered in the database as a Survey from "../schema/Survey.js"
// The fields for each Survey are surveyId, categoryName, topic, q1, q2, q3
// The database connection is made in "../database.js" and exports as connection
// Before adding any of these entries to the database, the function must first check if these entries already exist
// If they do, the function should not add them again

import fs from 'fs';
import path from 'path';
import Survey from '../schema/Survey.js';

const surveysDataPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  'data',
  'surveys.json'
);

const surveysData = JSON.parse(fs.readFileSync(surveysDataPath, 'utf8'));

async function populateSurveys() {
  console.log('Populating surveys...');

  for (const surveyData of surveysData) {
    const surveyExists = await Survey.findOne({ _id: surveyData._id });

    if (!surveyExists) {
      const newSurvey = new Survey({
        categoryName: surveyData.categoryName,
        topic: surveyData.topic,
        q1: surveyData.q1,
        q2: surveyData.q2,
        q3: surveyData.q3,
      });

      try {
        await newSurvey.save();
        console.log(`Survey "${newSurvey._id}" added.`);
      } catch (error) {
        console.error(`Error adding survey "${newSurvey._id}":`, error.message);
      }
    } else {
      console.log(`Survey "${surveyData.surveyId}" already exists.`);
    }
  }

  console.log('Finished populating surveys.');
}

export default populateSurveys;
