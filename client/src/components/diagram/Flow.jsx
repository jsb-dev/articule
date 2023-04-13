import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TopicNode from './nodes/topics/TopicNode';
import CategoryNode from './nodes/categories/CategoryNode';
import RootNode from './nodes/RootNode';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  // This is where the user's nodes will be fetched from the server
  // For now there is just an example for syntax
  /*
  {
    id: '1',
    type: 'rootNode',
    position: { x: 0, y: 0 },
    data: {
      artistName: 'This is the artist name',
      primaryContent: 'This is the primary content',
      artistSummary: 'This is the artist summary',
    },
  },
  */
];

const initialEdges = [
  // This is where the user's nodes will be fetched from the server
  // For now, there's just an example for syntax
  // { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  topicNode: TopicNode,
  categoryNode: CategoryNode,
  rootNode: RootNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
    // send nodes to server
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
    // send edges to server
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
    // send edges to server
  );

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