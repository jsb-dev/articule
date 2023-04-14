import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserEmailContext from '../contexts/UserEmailContext';
import generateId from '../utils/generateId';
import checkAccountEmail from '../utils/checkAccountEmail';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setUserEmail } = useContext(UserEmailContext);
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (isAuthenticated && user) {
        try {
          const data = await checkAccountEmail(user.email);
          setAccountData(data);
        } catch (error) {
          console.error('Error checking account:', error);
        }
      }
      setAccountCheckLoading(false);
    };

    fetchAccountData();
  }, [isAuthenticated, user]);

  const redirectToSurvey = () => {
    generateId()
      .then((_id) => {
        const surveyUrl = `/survey/introduction/?_id=${_id}`;
        navigate(surveyUrl);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setUserEmail(user.email);
  };

  const redirectToDashboard = () => {
    const dashboardUrl = `/dashboard/?_id=${accountData._id}`;
    navigate(dashboardUrl);
  };

  if (isLoading || accountCheckLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>{accountData ? redirectToDashboard() : redirectToSurvey()}</>
    )
  );
}

export default CheckpointPage;
