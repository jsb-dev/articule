import BlankNode from '../components/diagram/diagram-components/nodes/BlankNode';
import CreateCategoryNodes from '../components/diagram/diagram-components/nodes/categories/CreateCategoryNodes';
import RootNode from '../components/diagram/diagram-components/nodes/RootNode';
import TopicNode from '../components/diagram/diagram-components/nodes/TopicNode';

export async function fetchDiagramData(
  fetch,
  apiUrl,
  isAuthenticated,
  isDataLoaded,
  _id
) {
  if (isAuthenticated && isDataLoaded) {
    const response = await fetch(`${apiUrl}diagram/get?_id=${_id}`);
    const data = await response.json();

    return {
      nodes: data.nodes,
      edges: data.edges,
    };
  }

  return null;
}

export async function fetchCategoryData(fetch, apiUrl, isAuthenticated) {
  if (isAuthenticated) {
    const response = await fetch(`${apiUrl}diagram/get/categories`);
    const data = await response.json();

    return data.data;
  }

  return null;
}

export function generateNodeTypes(categoryData) {
  if (categoryData.length > 0) {
    const categoryNodes = CreateCategoryNodes(categoryData);

    return {
      rootNode: RootNode,
      topicNode: TopicNode,
      blankNode: BlankNode,
      ...categoryNodes,
    };
  }

  return null;
}

export function checkDataReady(
  isAuthenticated,
  isDiagramLoaded,
  isCategoryListLoaded
) {
  return isAuthenticated && isDiagramLoaded && isCategoryListLoaded;
}
