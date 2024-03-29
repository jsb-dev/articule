import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';
import defaultDiagram from '../diagram/DefaultDiagram';
import 'survey-core/modern.min.css';

function IntroductionSurvey({ _id, userEmail }) {
  const { REACT_APP_API_URL } = env;
  const navigate = useNavigate();

  const surveyJson = {
    showCompletedPage: false,
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

  const sendDataToServer = useCallback(
    async (data) => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}account/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    },
    [REACT_APP_API_URL]
  );

  const surveyComplete = useCallback(
    async (sender) => {
      const results = sender.data;

      const data = {
        _id,
        email: userEmail,
        diagram: defaultDiagram(results),
      };

      await sendDataToServer(data);

      navigate(`/dashboard?_id=${_id}`);
    },
    [userEmail, navigate, _id, sendDataToServer]
  );

  const surveyModel = new Model(surveyJson);
  surveyModel.onComplete.add(surveyComplete);

  return <Survey model={surveyModel} />;
}

export default IntroductionSurvey;
