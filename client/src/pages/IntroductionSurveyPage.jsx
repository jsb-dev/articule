import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function IntroductionSurveyPage() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const { accountData, setAccountData } = useUserContext();
  const { id } = useParams();

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        await loginWithRedirect();
      } else {
        if (user && id) {
          setAccountData((prevData) => ({
            ...prevData,
            _id: id,
            email: user.email,
          }));
        }
        setIsAuthChecked(true);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, isLoading, loginWithRedirect, user, id, setAccountData]);

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
        <IntroductionSurvey
          _id={accountData?._id}
          userEmail={accountData?.email}
        />
      </section>
    )
  );
}

export default IntroductionSurveyPage;
