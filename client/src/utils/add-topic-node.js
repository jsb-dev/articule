import { generateEdgeId } from '../utils/generate-edge-id';
import { generateNodeId } from '../utils/generate-node-id';
import calculateOffset from './calculate-offset.js';

const addTopicNode = async (
  results,
  survey,
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
    type: 'topicNode',
    position: offset,
    data: {
      topic: survey.topic,
      questions: [survey.q1, survey.q2, survey.q3],
      results: results,
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

export default addTopicNode;
