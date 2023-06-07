import React, { useState, useEffect } from 'react';
import env from 'react-dotenv';
import ToggleButton from './ToggleButton';
import Drawer from './Drawer';
import { useContext } from 'react';
import { SurveyListContext } from '../../../../contexts/SurveyListContext';

function SurveyList({ surveys, nodeId }) {
  const [fetchedSurveys, setFetchedSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openedSurveyList, openSurveyList } = useContext(SurveyListContext);
  const isOpen = openedSurveyList === nodeId;

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

    if (isOpen && fetchedSurveys.length === 0) {
      fetchSurveys();
    }
  }, [surveys, isOpen]);

  const toggleList = () => {
    if (isOpen) {
      openSurveyList(null);
    } else {
      openSurveyList(nodeId);
    }
  };

  return (
    <div>
      <ToggleButton isOpen={isOpen} toggleList={toggleList} />
      <Drawer
        loading={loading}
        fetchedSurveys={fetchedSurveys}
        isOpen={isOpen}
      />
    </div>
  );
}

export default SurveyList;
