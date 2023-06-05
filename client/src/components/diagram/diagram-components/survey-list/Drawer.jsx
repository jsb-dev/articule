import React from 'react';
import SurveyListItem from './SurveyListItem';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const drawerStyle = (isOpen) => ({
  maxHeight: isOpen ? '1000px' : '0',
  overflow: 'hidden',
  transition: 'max-height 0.5s ease-in-out',
});

function Drawer({ loading, fetchedSurveys, isOpen }) {
  return (
    isOpen &&
    (loading ? (
      <div>
        <LoadingSpinner />
      </div>
    ) : (
      <div style={drawerStyle(isOpen)}>
        {fetchedSurveys.map((survey) => (
          <SurveyListItem
            key={survey._id}
            topic={survey.topic}
            survey={survey}
          />
        ))}
      </div>
    ))
  );
}

export default Drawer;
