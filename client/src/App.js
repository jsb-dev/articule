import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import CheckpointPage from './pages/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import IntroductionSurveyPage from './pages/IntroductionSurveyPage';
import { UserProvider } from './contexts/UserContext';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/checkpoint" element={<CheckpointPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/introduction" element={<IntroductionSurveyPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
