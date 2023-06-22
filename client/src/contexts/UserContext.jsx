import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import env from 'react-dotenv';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { REACT_APP_COOKIE_SECURE } = env;

  const [accountData, setAccountData] = useState(() => {
    const cookie = Cookies.get('accountData');
    return cookie ? JSON.parse(cookie) : null;
  });
  useEffect(() => {
    if (accountData) {
      Cookies.set('accountData', JSON.stringify(accountData), {
        secure: REACT_APP_COOKIE_SECURE,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('accountData');
    }
  }, [accountData]);

  return (
    <UserContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
