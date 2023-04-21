import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useUserContext } from '../contexts/UserContext';
import RootNode from '../components/diagram/nodes/RootNode';
import TopicNode from '../components/diagram/nodes/TopicNode';
import CreateCategoryNodes from '../components/diagram/nodes/categories/CreateCategoryNodes';
// import defaultDiagram from '../components/diagram/DefaultDiagram';

function DashboardPage() {
  const { REACT_APP_API_URL } = env;

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { userId } = useUserContext();
  const _id = userId;

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isCategoryListLoaded, setIsCategoryListLoaded] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [nodeTypes, setNodeTypes] = useState({});

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
          setIsDiagramLoaded(true);
        } catch (error) {
          console.error('Error fetching diagram data:', error);
        }
      }
    };

    fetchDiagramData();
  }, [isAuthenticated, _id, REACT_APP_API_URL]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(
            `${REACT_APP_API_URL}diagram/get/categories`
          );
          const data = await response.json();
          setCategoryData(data.data);
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      }
    };

    fetchCategoryData();
  }, [isAuthenticated, REACT_APP_API_URL]);

  useEffect(() => {
    if (isAuthenticated && categoryData.length > 0) {
      const categoryNodes = CreateCategoryNodes(categoryData);
      setNodeTypes({
        rootNode: RootNode,
        topicNode: TopicNode,
        ...categoryNodes,
      });
      setIsCategoryListLoaded(true);
    }
  }, [categoryData]);

  useEffect(() => {
    if (isAuthenticated && isDiagramLoaded && isCategoryListLoaded) {
      setIsDataReady(true);
    }
  }, [isAuthenticated, isDiagramLoaded, isCategoryListLoaded]);

  return isLoading && !isAuthChecked ? (
    <div>
      <section>
        <p>Loading... </p>
      </section>
    </div>
  ) : (
    <div>
      <section
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        {isDataReady && (
          <Flow
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            nodeTypes={nodeTypes}
          />
        )}
      </section>
    </div>
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
