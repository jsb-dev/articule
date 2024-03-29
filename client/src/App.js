import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import CheckpointPage from './pages/CheckpointPage';
import DashboardPage from './pages/DashboardPage';
import IntroductionSurveyPage from './pages/IntroductionSurveyPage';
import UserAccountPage from './pages/UserAccountPage';
import { UserProvider } from './contexts/UserContext';
import { NewNodeProvider } from './contexts/NewNodeContext';
import { SurveyListProvider } from './contexts/SurveyListContext';
import { EditNodeProvider } from './contexts/EditNodeContext';
import { HandleTypesProvider } from './contexts/HandleTypesContext';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <HandleTypesProvider>
          <NewNodeProvider>
            <SurveyListProvider>
              <EditNodeProvider>
                <Routes>
                  <Route path="/" element={<RootPage />} />
                  <Route path="/checkpoint" element={<CheckpointPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route
                    path="/introduction"
                    element={<IntroductionSurveyPage />}
                  />
                  <Route path="/account" element={<UserAccountPage />} />
                </Routes>
              </EditNodeProvider>
            </SurveyListProvider>
          </NewNodeProvider>
        </HandleTypesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
