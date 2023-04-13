import React from 'react';
import env from 'react-dotenv';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';

import './styles.css';

function App() {
  const { REACT_APP_API_URL } = env;
  const connect = async () => {
    const response = await fetch(`${REACT_APP_API_URL}connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data.message);
  };

  // call connect on page load
  connect();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
