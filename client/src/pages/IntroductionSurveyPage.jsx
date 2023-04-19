import React from 'react';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function IntroductionSurveyPage() {
  const _id = new URLSearchParams(window.location.search).get('_id');

  return (
    <section>
      <article>
        <h1>Introduction Survey</h1>
        <p>
          It looks like it's your first time here. Let's get to know you a bit
          better.
        </p>
      </article>
      <IntroductionSurvey _id={_id} />
    </section>
  );
}

export default IntroductionSurveyPage;
