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
      const storedAccountData = JSON.parse(cookie);
      const diagram = localStorage.getItem('diagram');
      if (diagram) {
        storedAccountData.diagram = JSON.parse(diagram);
      }
      setAccountData(storedAccountData);
    }
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (accountData) {
      const accountDataCopy = { ...accountData };
      if (accountData.diagram) {
        localStorage.setItem('diagram', JSON.stringify(accountData.diagram));
        delete accountDataCopy.diagram;
      }
      Cookies.set('accountData', JSON.stringify(accountDataCopy), {
        secure: REACT_APP_COOKIE_SECURE === 'true',
        sameSite: 'none',
      });
    } else {
      Cookies.remove('accountData');
      localStorage.removeItem('diagram');
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
