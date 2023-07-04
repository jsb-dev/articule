import { generateEdgeId } from '../utils/generate-edge-id';
import { generateNodeId } from '../utils/generate-node-id';
import calculateOffset from './calculate-offset.js';

const addBlankNode = async (
  nodePosition,
  openedSurveyList,
  sourceHandle,
  targetHandle,
  nodeIds,
  edgeIds
) => {
  const nodeId = await generateNodeId(nodeIds);
  const edgeId = await generateEdgeId(edgeIds);

  const edgeStyles = {
    stroke: '#000000',
    strokeWidth: 4,
  };

  const offset = calculateOffset(targetHandle, nodePosition, 300, 500);

  const node = {
    id: nodeId,
    type: 'blankNode',
    position: offset,
    data: {
      content: '',
    },
  };

  const edge = {
    source: openedSurveyList,
    sourceHandle: sourceHandle,
    target: nodeId,
    targetHandle: targetHandle,
    id: edgeId,
    deletable: 'true',
    focusable: 'true',
    style: edgeStyles,
  };

  return { node, edge };
};

export default addBlankNode;
