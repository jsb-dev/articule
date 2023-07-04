import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import env from 'react-dotenv';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import {
  fetchAccountData,
  getSurveyUrl,
  getDashboardUrl,
} from '../utils/prepare-checkpoint';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setAccountData } = useUserContext();
  const [localAccountData, setLocalAccountData] = useState(null);
  const [isAccountDataFetched, setIsAccountDataFetched] = useState(false);
  const [message, setMessage] = useState('');

  const { REACT_APP_API_URL } = env;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDataAndSetState = async () => {
      if (!isLoading && isAuthenticated) {
        try {
          const data = await fetchAccountData(user.email, REACT_APP_API_URL);
          data.auth = isAuthenticated;
          setLocalAccountData(data);
          setAccountData(data);
        } catch (error) {
          setMessage(
            `We're having trouble checking your account, please log out and try again. If the problem persists, please contact support. \n\nError Message: ${error}`
          );
        }
        setIsAccountDataFetched(true);
      }
    };

    fetchAccountDataAndSetState();
  }, [isLoading, isAuthenticated, user]);

  useEffect(() => {
    const redirect = async () => {
      if (isAccountDataFetched) {
        if (localAccountData) {
          const dashboardUrl = await getDashboardUrl(
            localAccountData,
            setAccountData
          );
          navigate(dashboardUrl);
        } else {
          const surveyUrl = await getSurveyUrl();
          if (surveyUrl) {
            navigate(surveyUrl);
          }
        }
      }
    };

    redirect();
  }, [isAccountDataFetched, localAccountData, navigate, setAccountData]);

  return isAuthenticated && <LoadingSpinner />;
}

export default CheckpointPage;
