import React from 'react';
import env from 'react-dotenv';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';
import Flow from './components/diagram/Flow';

import './styles.css';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Flow />
    </div>
    /*
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    */
  );
}

export default App;
