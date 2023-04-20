import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';

function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);

  const { REACT_APP_API_URL } = env;
  const _id = new URLSearchParams(window.location.search).get('_id');

  useEffect(() => {
    const fetchDiagramData = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}diagram/get?_id=${_id}`
        );
        const data = await response.json();
        setInitialNodes(data.nodes);
        setInitialEdges(data.edges);
      } catch (error) {
        console.error('Error fetching diagram data:', error);
      }

      console.log('initialNodes:', initialNodes);
      console.log('initialEdges:', initialEdges);
    };

    fetchDiagramData();
  }, [isAuthenticated, _id, REACT_APP_API_URL]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    isAuthenticated && (
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
          <Flow initialNodes={initialNodes} initialEdges={initialEdges} />
        </section>
      </div>
    )
  );
}

export default DashboardPage;
