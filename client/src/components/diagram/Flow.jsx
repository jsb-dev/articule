import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TopicNode from './nodes/topics/TopicNode';
import {
  ContentNode,
  AudienceNode,
  MonetisationNode,
  StgNode,
  LtgNode,
  SkillsNode,
  VisualIdentityNode,
  SocialMediaNode,
  NetworkingNode,
  LegalNode,
  AnalyticsNode,
} from './nodes/categories/Categories';
import RootNode from './nodes/RootNode';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  rootNode: RootNode,
  topicNode: TopicNode,
  contentNode: ContentNode,
  audienceNode: AudienceNode,
  monetisationNode: MonetisationNode,
  stgNode: StgNode,
  ltgNode: LtgNode,
  skillsNode: SkillsNode,
  visualIdentityNode: VisualIdentityNode,
  socialMediaNode: SocialMediaNode,
  networkingNode: NetworkingNode,
  legalNode: LegalNode,
  analyticsNode: AnalyticsNode,
};

function Flow({ initialNodes, initialEdges }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
    console.log(nodes)
    // send nodes to server
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
    console.log(edges)
    // send edges to server
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
    console.log(edges)
    // send edges to server
  );

  console.log('nodes:', nodes);
  console.log('edges:', edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
