import React, { useState } from 'react';
import ComboNavBar from '../components/shared/navbar/ComboNavBar';
import AuthToggleButton from '../components/shared/AuthToggleButton';

function RootPage() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <ComboNavBar />
      <h1>Login Page</h1>
      <AuthToggleButton />
    </div>
  );
}

export default RootPage;
