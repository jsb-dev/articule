import fs from 'fs';
import path from 'path';
import Survey from '../models/Survey.js';

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
    const surveyExists = await Survey.findOne({ topic: surveyData.topic });

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
      console.log(`Survey "${surveyData.topic}" already exists.`);
    }
  }

  console.log('Finished populating surveys.');
}

export default populateSurveys;
