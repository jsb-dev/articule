import React, { useState } from 'react';
import ComboNavBar from '../components/shared/navbar/ComboNavBar';

function RootPage() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <ComboNavBar />
      <h1>Login Page</h1>
    </div>
  );
}

export default RootPage;
