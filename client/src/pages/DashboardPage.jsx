import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useUserContext } from '../contexts/UserContext';
// import defaultDiagram from '../components/diagram/DefaultDiagram';

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
            width: '100vw',
            height: '100vh',
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

/* Use this to style the default diagram

function DashboardPage() {
  const results = {
    artistName: 'test',
    primaryContent: 'test',
    artistSummary: 'test',
  };
  const diagram = defaultDiagram(results);
  console.log('diagram:', diagram);

  const initialEdges = diagram.edges;
  const initialNodes = diagram.nodes;

  console.log('initialNodes:', initialNodes);
  console.log('initialEdges:', initialEdges);

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Flow initialNodes={initialNodes} initialEdges={initialEdges} />
    </section>
  );
}

*/

export default DashboardPage;
