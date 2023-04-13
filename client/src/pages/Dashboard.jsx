import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';

import LogoutButton from '../components/auth/LogoutButton';
import IntroductionSurvey from '../components/surveys/IntroductionSurvey';

function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { REACT_APP_API_URL } = env;

  const [accountData, setAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);

  useEffect(() => {
    const checkAccount = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(`${REACT_APP_API_URL}account/check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });

          const data = await response.json();
          setAccountData(data);
        } catch (error) {
          console.error('Error checking account:', error);
        }
      }
      setAccountCheckLoading(false);
    };

    checkAccount();
  }, [isAuthenticated, user]);

  if (isLoading || accountCheckLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        {accountData ? (
          <div>
            <h1>Dashboard Page</h1>
            <h2>{user.email}</h2>
            <LogoutButton />
          </div>
        ) : (
          // change this to redirect to the survey page instead of rendering the survey component
          <IntroductionSurvey email={user.email} />
        )}
      </>
    )
  );
}

export default Dashboard;
