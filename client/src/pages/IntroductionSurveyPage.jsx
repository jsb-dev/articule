import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom'; // <--- added this import
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function IntroductionSurveyPage() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const { accountData, setAccountData } = useUserContext();
  const location = useLocation(); // <--- get the current location

  const query = new URLSearchParams(location.search);
  const id = query.get('_id'); // <--- get the id from the query string

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
        <IntroductionSurvey _id={id} userEmail={user?.email} />
      </section>
    )
  );
}

export default IntroductionSurveyPage;
