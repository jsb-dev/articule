import React, { useEffect, useState } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useUserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import RootNode from '../components/diagram/diagram-components/nodes/RootNode';
import TopicNode from '../components/diagram/diagram-components/nodes/TopicNode';
import CreateCategoryNodes from '../components/diagram/diagram-components/nodes/categories/CreateCategoryNodes';
// import defaultDiagram from '../components/diagram/DefaultDiagram';

function DashboardPage() {
  const { REACT_APP_API_URL } = env;

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { userId } = useUserContext();
  const _id = userId;

  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isCategoryListLoaded, setIsCategoryListLoaded] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [message, setMessage] = useState('');

  const [diagramNodes, setDiagramNodes] = useState([]);
  const [diagramEdges, setDiagramEdges] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [nodeTypes, setNodeTypes] = useState({});

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          await loginWithRedirect();
        } else {
          return;
        }
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
          setDiagramNodes(data.nodes);
          setDiagramEdges(data.edges);
          setIsDiagramLoaded(true);
        } catch (error) {
          setMessage(
            `We're having trouble recovering your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
          );
        }
      }
    };

    fetchDiagramData();
  }, [isAuthenticated, _id, REACT_APP_API_URL, setIsDiagramLoaded]);

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
          setMessage(
            `We're having trouble recovering the surveys for your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
          );
        }
      }
    };

    fetchCategoryData();
  }, [isAuthenticated, REACT_APP_API_URL]);

  useEffect(() => {
    if (isAuthenticated) {
      if (categoryData.length > 0) {
        try {
          const categoryNodes = CreateCategoryNodes(categoryData);
          setNodeTypes({
            rootNode: RootNode,
            topicNode: TopicNode,
            ...categoryNodes,
          });
          setIsCategoryListLoaded(true);
        } catch (error) {
          setMessage(
            `We're having trouble recovering the surveys for your diagram, please log out and try again. If this issue persists, please contact support.\n\nError Message: ${error}`
          );
        }
      }
    }
  }, [categoryData]);

  useEffect(() => {
    if (isAuthenticated && isDiagramLoaded && isCategoryListLoaded) {
      setIsDataReady(true);
    }
  }, [isAuthenticated, isDiagramLoaded, isCategoryListLoaded]);

  return isLoading ? (
    <LoadingSpinner />
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
            diagramNodes={diagramNodes}
            diagramEdges={diagramEdges}
            nodeTypes={nodeTypes}
          />
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
