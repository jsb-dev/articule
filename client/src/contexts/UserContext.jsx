import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import env from 'react-dotenv';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { REACT_APP_COOKIE_SECURE } = env;

  const [accountData, setAccountData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get('accountData');
    if (cookie) {
      setAccountData(JSON.parse(cookie));
    }
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (accountData) {
      Cookies.set('accountData', JSON.stringify(accountData), {
        secure: REACT_APP_COOKIE_SECURE,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('accountData');
    }
  }, [accountData, REACT_APP_COOKIE_SECURE]);

  return (
    <UserContext.Provider value={{ accountData, setAccountData, isDataLoaded }}>
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
