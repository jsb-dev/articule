import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ComboNavBar from '../components/shared/navbar/ComboNavBar';
import {
  fetchDiagramData,
  fetchCategoryData,
  generateNodeTypes,
  checkDataReady,
} from '../utils/prepare-dashboard';

function DashboardPage() {
  const { REACT_APP_API_URL } = env;

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { accountData, isDataLoaded } = useUserContext();

  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isCategoryListLoaded, setIsCategoryListLoaded] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [message, setMessage] = useState('');

  const [diagramNodes, setDiagramNodes] = useState([]);
  const [diagramEdges, setDiagramEdges] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [nodeTypes, setNodeTypes] = useState({});

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const _id = urlParams.get('_id');

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isLoading && !isAuthenticated && !accountData) {
        await loginWithRedirect();
      }
    };

    checkAuthentication();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const data = await fetchDiagramData(fetch, REACT_APP_API_URL, _id);
          if (data) {
            setDiagramNodes(data.nodes);
            setDiagramEdges(data.edges);
            setIsDiagramLoaded(true);
          }
        } catch (error) {
          setMessage(
            `We're having trouble recovering your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
          );
        }
      };

      fetchData();
    }
  }, [isAuthenticated, isDataLoaded, REACT_APP_API_URL, _id]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const data = await fetchCategoryData(fetch, REACT_APP_API_URL);
          if (data) {
            setCategoryData(data);
          }
        } catch (error) {
          setMessage(
            `We're having trouble recovering the surveys for your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
          );
        }
      };

      fetchData();
    }
  }, [isAuthenticated, REACT_APP_API_URL]);

  useEffect(() => {
    if (isAuthenticated && categoryData.length > 0) {
      try {
        const newTypes = generateNodeTypes(categoryData);
        if (newTypes) {
          setNodeTypes(newTypes);
          setIsCategoryListLoaded(true);
        }
      } catch (error) {
        setMessage(
          `We're having trouble recovering the surveys for your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
        );
      }
    }
  }, [isAuthenticated, categoryData]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsDataReady(checkDataReady(isDiagramLoaded, isCategoryListLoaded));
    }
  }, [isAuthenticated, isDiagramLoaded, isCategoryListLoaded]);

  return isLoading || !isDataLoaded ? (
    <LoadingSpinner />
  ) : (
    <main>
      <ComboNavBar />
      <div>
        <section
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          {isDataReady && (
            <Flow
              diagramNodes={diagramNodes}
              diagramEdges={diagramEdges}
              nodeTypes={nodeTypes}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
