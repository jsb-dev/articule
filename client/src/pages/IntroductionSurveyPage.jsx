import React from 'react';
import { useParams } from 'react-router-dom';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function IntroductionSurveyPage() {
  const { _id } = useParams();

  return <IntroductionSurvey _id={_id} />;
}

export default IntroductionSurveyPage;
