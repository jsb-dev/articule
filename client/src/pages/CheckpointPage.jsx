import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserEmailContext from '../contexts/UserEmailContext';
import generateId from '../utils/generateId';
import checkAccountEmail from '../utils/checkAccountEmail';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setUserEmail } = useContext(UserEmailContext);
  const [accountData, setAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);

  const navigate = useNavigate();

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

  const getSurveyUrl = async () => {
    try {
      const _id = await generateId();
      return `/survey/introduction/?_id=${_id}`;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getDashboardUrl = () => {
    return `/dashboard/?_id=${accountData._id}`;
  };

  useEffect(() => {
    const navigateIfNeeded = async () => {
      if (isAuthenticated && !isLoading && !accountCheckLoading) {
        if (accountData) {
          navigate(getDashboardUrl());
        } else {
          const surveyUrl = await getSurveyUrl();
          if (surveyUrl) {
            navigate(surveyUrl);
          }
        }
        setUserEmail(user.email);
      }
    };

    navigateIfNeeded();
  }, [isAuthenticated, isLoading, accountCheckLoading, accountData, user]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isAuthenticated ? (
    <section>
      {isLoading || accountCheckLoading ? (
        <div>Loading ...</div>
      ) : (
        <article>
          <h1>Checking your account information...</h1>
        </article>
      )}
    </section>
  ) : (
    <></>
  );
}

export default CheckpointPage;
