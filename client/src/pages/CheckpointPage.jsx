import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import generateId from '../utils/generateId';
import checkAccountEmail from '../utils/checkAccountEmail';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setUserEmail, setUserId } = useUserContext();
  const [accountData, setAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAccountData();
  }, [isLoading, user]);

  useEffect(() => {
    if (!accountCheckLoading) {
      redirect();
    }
  }, [accountCheckLoading, accountData]);

  const getSurveyUrl = async () => {
    try {
      const _id = await generateId();
      setUserEmail(user.email);
      setUserId(_id);
      return `/introduction?_id=${_id}`;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getDashboardUrl = () => {
    setUserEmail(accountData.email);
    setUserId(accountData._id);

    return `/dashboard?_id=${accountData._id}`;
  };

  const redirect = async () => {
    if (accountData) {
      const dashboardUrl = getDashboardUrl();
      navigate(dashboardUrl);
    } else {
      const surveyUrl = await getSurveyUrl();
      navigate(surveyUrl);
    }
  };

  const fetchAccountData = async () => {
    if (!isLoading && isAuthenticated && user) {
      try {
        const data = await checkAccountEmail(user.email);
        setAccountData(data);
      } catch (error) {
        console.error('Error checking account:', error);
      }
      setAccountCheckLoading(false);
    }
  };

  return isLoading || accountCheckLoading ? (
    <section>
      <div>Loading ...</div>
    </section>
  ) : (
    <section>
      <div>Redirecting ...</div>
    </section>
  );
}

export default CheckpointPage;
