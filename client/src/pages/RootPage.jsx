import React from 'react';
import LoginButton from '../components/auth/LoginButton';
import LogoutButton from '../components/auth/LogoutButton';

function RootPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default RootPage;
