import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../contexts/UserContext';

const AuthToggleButton = () => {
  const { accountData, setAccountData } = useUserContext();
  const { loginWithRedirect, logout } = useAuth0();

  const handleToggle = () => {
    if (!accountData.auth) {
      loginWithRedirect();
    } else {
      logout({ returnTo: window.location.origin });
    }
    setAccountData({
      ...accountData,
      auth: !accountData.auth,
    });
  };

  return (
    <button onClick={handleToggle}>
      {accountData.auth ? 'Logout' : 'Login'}
    </button>
  );
};

export default AuthToggleButton;
