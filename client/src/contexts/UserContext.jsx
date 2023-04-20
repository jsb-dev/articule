import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import env from 'react-dotenv';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { REACT_APP_COOKIE_SECURE } = env;

  const [userEmail, setUserEmail] = useState(
    () => Cookies.get('userEmail') || ''
  );
  const [userId, setUserId] = useState(() => Cookies.get('userId') || '');

  useEffect(() => {
    if (userEmail) {
      Cookies.set('userEmail', userEmail, {
        secure: REACT_APP_COOKIE_SECURE,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('userEmail');
    }
  }, [userEmail]);

  useEffect(() => {
    if (userId) {
      Cookies.set('userId', userId, {
        secure: REACT_APP_COOKIE_SECURE,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userId, setUserId }}
    >
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
