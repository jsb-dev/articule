import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useUserContext } from '../contexts/UserContext';

function DashboardPage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { userId } = useUserContext();
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);

  const { REACT_APP_API_URL } = env;
  const _id = userId;

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        await loginWithRedirect();
      } else {
        setIsAuthChecked(true);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    const fetchDiagramData = async () => {
      console.log('fetchDiagramData() called');
      if (isAuthenticated) {
        try {
          const response = await fetch(
            `${REACT_APP_API_URL}diagram/get?_id=${_id}`
          );
          const data = await response.json();
          setInitialNodes(data.nodes);
          setInitialEdges(data.edges);
          setIsDataLoaded(true);
        } catch (error) {
          console.error('Error fetching diagram data:', error);
        }
      }
    };

    fetchDiagramData();
  }, [isAuthenticated, _id, REACT_APP_API_URL]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    isAuthChecked && (
      <div>
        <section>
          <header>
            <h1>Dashboard</h1>
            <p>This is the dashboard page</p>
          </header>
        </section>
        <section
          style={{
            width: '80vw',
            height: '80vh',
          }}
        >
          {isDataLoaded ? (
            <Flow initialNodes={initialNodes} initialEdges={initialEdges} />
          ) : (
            <div>Loading diagram data...</div>
          )}
        </section>
      </div>
    )
  );
}

export default DashboardPage;
