import React from 'react';

const buttonStyle = {
  borderRadius: '1rem',
};

function ToggleSurveyListButton({ isOpen, toggleList }) {
  return (
    <button style={buttonStyle} onClick={toggleList}>
      {isOpen ? 'Hide' : 'Expand'}
    </button>
  );
}

export default ToggleSurveyListButton;
