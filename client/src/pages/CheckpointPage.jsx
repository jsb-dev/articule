import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import generateId from '../utils/generateId';
import checkAccountEmail from '../utils/checkAccountEmail';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [accountData, setAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);

  const navigate = useNavigate();

  const getSurveyUrl = async () => {
    try {
      const _id = await generateId();
      console.log('_id generated:', _id);
      return `/introduction?_id=${_id}`;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getDashboardUrl = () => {
    return `/dashboard?_id=${accountData._id}`;
  };

  const redirect = async () => {
    if (!accountCheckLoading) {
      if (accountData) {
        const dashboardUrl = getDashboardUrl();
        navigate(dashboardUrl);
      } else {
        const surveyUrl = await getSurveyUrl();
        navigate(surveyUrl);
      }
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
    }

    setAccountCheckLoading(false);

    redirect();
  };

  useEffect(() => {
    fetchAccountData();
  }, [isLoading, user]);

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
