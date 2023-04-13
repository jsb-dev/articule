import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import env from 'react-dotenv';

// Default V2 theme
import 'survey-core/defaultV2.min.css';
// Modern theme
// import 'survey-core/modern.min.css';

function IntroductionSurvey({ email }) {
  const { REACT_APP_API_URL } = env;

  const surveyJson = {
    elements: [
      {
        name: 'artistName',
        title: 'Enter your name, artist alias or brand name here:',
        type: 'text',
      },
      {
        name: 'primaryContent',
        title:
          'Give a brief description of the main type of content you make (e.g. Cooking Tutorials, Fanfiction, etc.):',
        type: 'text',
      },
      {
        name: 'artistSummary',
        title:
          'How would you summarise your creative identity in 1-3 sentences?',
        type: 'text',
      },
    ],
  };

  const surveyComplete = useCallback(
    async (sender) => {
      const results = sender.data;

      // Create an object with the required fields and email (prop)
      const data = {
        email,
        artistName: results.artistName,
        primaryContent: results.primaryContent,
        artistSummary: results.artistSummary,
        diagram: [], // Set this to an empty array or any default value you need
      };

      console.log('Survey data:', data);

      /*
    // Send the data to the server at the ${REACT_APP_API_URL}account/create endpoint
    try {
      const response = await fetch(`${REACT_APP_API_URL}account/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Account created successfully:', responseData);
      } else {
        console.error('Error creating account:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending survey data to server:', error);
    }
    */
    },
    [email, REACT_APP_API_URL]
  );

  const survey = new Model(surveyJson);
  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}

export default IntroductionSurvey;
