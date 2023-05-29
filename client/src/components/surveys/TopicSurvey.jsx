import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import env from 'react-dotenv';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { REACT_APP_API_URL } = env;

  const namePrefix = survey.topic.replace(/\s/g, '');
  const elementNames = [
    `${namePrefix}-q1`,
    `${namePrefix}-q2`,
    `${namePrefix}-q3`,
  ];

  const surveyJson = {
    showCompletedPage: false,
    elements: [
      {
        name: elementNames[0],
        title: `${survey.q1}`,
        type: 'text',
      },
      {
        name: elementNames[1],
        title: `${survey.q2}`,
        type: 'text',
      },
      {
        name: elementNames[2],
        title: `${survey.q3}`,
        type: 'text',
      },
    ],
  };

  const sendDataToServer = async (data) => {
    try {
      // TODO: Send the data to the server
      //   if (!response.ok) {
      //     throw new Error(`HTTP error ${response.status}`);
      //   }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const surveyComplete = useCallback(
    async (sender) => {
      // TODO: Send the data to the server
    },
    [REACT_APP_API_URL]
  );

  const surveyModel = new Model(surveyJson);
  surveyModel.onComplete.add(surveyComplete);

  return <Survey model={surveyModel} />;
}

export default TopicSurvey;
