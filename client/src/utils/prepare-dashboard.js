import BlankNode from '../components/diagram/diagram-components/nodes/BlankNode';
import CreateCategoryNodes from '../components/diagram/diagram-components/nodes/categories/CreateCategoryNodes';
import RootNode from '../components/diagram/diagram-components/nodes/RootNode';
import TopicNode from '../components/diagram/diagram-components/nodes/TopicNode';

export async function fetchDiagramData(fetch, apiUrl, _id) {
  const response = await fetch(`${apiUrl}diagram/get?_id=${_id}`);
  const data = await response.json();

  return {
    nodes: data.nodes,
    edges: data.edges,
  };
}

export async function fetchCategoryData(fetch, apiUrl) {
  const response = await fetch(`${apiUrl}diagram/get/categories`);
  const data = await response.json();

  return data.data;
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

export function checkDataReady(isDiagramLoaded, isCategoryListLoaded) {
  return isDiagramLoaded && isCategoryListLoaded;
}
