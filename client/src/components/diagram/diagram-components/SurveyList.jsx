import React, { useState, useEffect } from 'react';
import SurveyListItem from './SurveyListItem';
import LoadingSpinner from '../../shared/LoadingSpinner';
import env from 'react-dotenv';

function SurveyList({ surveys }) {
  const [fetchedSurveys, setFetchedSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  const { REACT_APP_API_URL } = env;

  useEffect(() => {
    async function fetchSurveys() {
      setLoading(true);
      const requests = surveys.map(async (_id) => {
        const response = await fetch(
          `${REACT_APP_API_URL}survey/get?_id=${_id}`
        );
        return response.json();
      });

      const data = await Promise.all(requests);
      setFetchedSurveys(data);
      setLoading(false);
    }

    fetchSurveys();
  }, [surveys]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {fetchedSurveys.map((survey) => (
        <SurveyListItem
          key={survey._id}
          _id={survey._id}
          topic={survey.topic}
        />
      ))}
    </div>
  );
}

export default SurveyList;
