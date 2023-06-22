import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import generateUserId from '../utils/generate-user-id';
import getAccountByEmail from '../utils/get-account-by-email';

function CheckpointPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setAccountData } = useUserContext();
  const [accountData, setLocalAccountData] = useState(null);
  const [accountCheckLoading, setAccountCheckLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!isLoading) {
        try {
          const data = await getAccountByEmail(user.email);
          setLocalAccountData(data);
        } catch (error) {
          setMessage(
            `We're having trouble checking your account, please log out and try again. If the problem persists, please contact support. \n\nError Message: ${error}`
          );
        }
        setAccountCheckLoading(false);
      }
    };

    fetchAccountData();
  }, [isLoading, user]);

  const getSurveyUrl = async () => {
    try {
      const _id = await generateUserId();
      return `/introduction?_id=${_id}`;
    } catch (error) {
      setMessage(
        `We're having trouble creating your account, please log out and try again. If the problem persists, please contact support. \n\nError Message: ${error}`
      );
    }
  };

  const getDashboardUrl = () => {
    setAccountData(accountData);
    return `/dashboard?_id=${accountData._id}`;
  };

  useEffect(() => {
    const redirect = async () => {
      if (accountData) {
        const dashboardUrl = getDashboardUrl();
        navigate(dashboardUrl);
      } else {
        const surveyUrl = await getSurveyUrl();
        navigate(surveyUrl);
      }
    };

    if (!accountCheckLoading) {
      redirect();
    }
  }, [accountCheckLoading, accountData]);

  return isAuthenticated && <LoadingSpinner />;
}

export default CheckpointPage;
