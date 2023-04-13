// PopulateTopicCollections.js
// This function must be run third (after PopulateCategories.js and PopulateSurveys.js)
// This function searches the database for each Category and collects the categoryName for each
// This function then creates a different TopicCollection from "../schema/TopicCollection.js" for each categoryName found
// The fields for each TopicCollection are categoryName and surveys
// The value for categoryName is the categoryName from the Category that was found
// The value for surveys is an array which should hold the surveyId for each Survey from "../schema/Survey.js" that has the same value for categoryName as the TopicCollection
// The database connection is made in "../database.js" and exports as connection
// Before adding any of these entries to the database, the function must first check if these entries already exist
// If they do, the function should not add them again

import Category from '../schema/Category.js';
import Survey from '../schema/Survey.js';
import TopicCollection from '../schema/TopicCollection.js';

async function populateTopicCollections() {
  console.log('Populating topic collections...');

  const categories = await Category.find({});

  for (const category of categories) {
    const topicCollectionExists = await TopicCollection.findOne({
      categoryName: category.categoryName,
    });

    if (!topicCollectionExists) {
      const surveysInCategory = await Survey.find({
        categoryName: category.categoryName,
      });

      const surveyIdsInCategory = surveysInCategory.map((survey) => survey._id);

      const newTopicCollection = new TopicCollection({
        categoryName: category.categoryName,
        surveys: surveyIdsInCategory,
      });

      try {
        await newTopicCollection.save();
        console.log(
          `TopicCollection for "${newTopicCollection.categoryName}" added.`
        );
      } catch (error) {
        console.error(
          `Error adding TopicCollection for "${newTopicCollection.categoryName}":`,
          error.message
        );
      }
    } else {
      console.log(
        `TopicCollection for "${category.categoryName}" already exists.`
      );
    }
  }

  console.log('Finished populating topic collections.');
}

export default populateTopicCollections;
