import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function IntroductionSurveyPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState(null);

  const _id = new URLSearchParams(window.location.search).get('_id');
  console.log('_id on page:', _id);

  useEffect(() => {
    if (!isLoading) {
      setEmail(user?.email);
      console.log('email:', email);
    }
  }, [isLoading, user]);

  return (
    <section>
      <article>
        <h1>Introduction Survey</h1>
        <p>
          It looks like it's your first time here. Let's get to know you a bit
          better.
        </p>
      </article>
      {!isLoading && email && (
        <IntroductionSurvey _id={_id} userEmail={email} />
      )}
    </section>
  );
}

export default IntroductionSurveyPage;
