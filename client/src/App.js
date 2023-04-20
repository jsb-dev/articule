import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import CheckpointPage from './pages/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import SurveyPage from './pages/SurveyPage';
import IntroductionSurveyPage from './pages/IntroductionSurveyPage';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/checkpoint" element={<CheckpointPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/introduction" element={<IntroductionSurveyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
