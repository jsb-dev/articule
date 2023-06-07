import React from 'react';

const buttonStyle = {
  borderRadius: '1rem',
};

function SurveyToggleButton({ isOpen, toggleList }) {
  return (
    <button style={buttonStyle} onClick={toggleList}>
      {isOpen ? 'Hide Surveys' : 'Show Surveys'}
    </button>
  );
}

export default SurveyToggleButton;