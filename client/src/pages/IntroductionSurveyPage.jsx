import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';
import { useUserContext } from '../contexts/UserContext';

function IntroductionSurveyPage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { userId, userEmail } = useUserContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        await loginWithRedirect();
      } else {
        setIsAuthChecked(true);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    isAuthChecked && (
      <section>
        <article>
          <h1>Introduction Survey</h1>
          <p>
            It looks like it's your first time here. Let's get to know you a bit
            better.
          </p>
        </article>
        <IntroductionSurvey _id={userId} userEmail={userEmail} />
      </section>
    )
  );
}

export default IntroductionSurveyPage;
