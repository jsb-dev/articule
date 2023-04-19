import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserEmailContext from './contexts/UserEmailContext';
import RootPage from './pages/RootPage';
import CheckpointPage from './pages/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import SurveyPage from './pages/SurveyPage';
import IntroductionSurveyPage from './pages/IntroductionSurveyPage';

import './styles.css';

function App() {
  const [userEmail, setUserEmail] = React.useState(null);

  return (
    <BrowserRouter>
      <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/checkpoint" element={<CheckpointPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route
            path="/survey/introduction"
            element={<IntroductionSurveyPage />}
          />
        </Routes>
      </UserEmailContext.Provider>
    </BrowserRouter>
  );
}

export default App;
