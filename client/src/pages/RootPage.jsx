import React, { useState } from 'react';
import ComboNavBar from '../components/shared/navbar/ComboNavBar';
import LoginButton from '../components/auth/LoginButton';

function RootPage() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <ComboNavBar />
      <h1>Login Page</h1>
      <LoginButton />
    </div>
  );
}

export default RootPage;
