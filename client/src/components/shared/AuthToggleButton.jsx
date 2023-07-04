import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../contexts/UserContext';
import Cookies from 'js-cookie';

const AuthToggleButton = () => {
  const { accountData, setAccountData } = useUserContext();
  const { loginWithRedirect, logout } = useAuth0();

  const loginUser = () => {
    loginWithRedirect();
    setAccountData({
      ...accountData,
      auth: true,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('diagram');
    Cookies.remove('accountData');
    logout({ returnTo: window.location.origin });
    setAccountData(null);
  };

  const handleToggle = () => {
    const isAuthenticated =
      accountData && 'auth' in accountData ? accountData.auth : false;
    isAuthenticated ? logoutUser() : loginUser();
  };

  let buttonText = 'Login';
  if (accountData && 'auth' in accountData) {
    buttonText = accountData.auth ? 'Logout' : 'Login';
  }

  return <button onClick={handleToggle}>{buttonText}</button>;
};

export default AuthToggleButton;
