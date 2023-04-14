import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import env from 'react-dotenv';
import UserEmailContext from '../../contexts/UserEmailContext';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function IntroductionSurvey({ _id }) {
  const { REACT_APP_API_URL } = env;
  const { userEmail } = useContext(UserEmailContext);

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

      const data = {
        _id,
        email: userEmail,
        diagram: [
          {
            id: 'rootNode',
            type: 'rootNode',
            position: {
              x: 0,
              y: 0,
            },
            data: {
              artistName: results.artistName,
              primaryContent: results.primaryContent,
              artistSummary: results.artistSummary,
            },
          },
        ],
      };

      // Send the data to the server at the ${REACT_APP_API_URL}account/create endpoint
    },
    [userEmail, REACT_APP_API_URL]
  );

  const survey = new Model(surveyJson);
  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}

export default IntroductionSurvey;
