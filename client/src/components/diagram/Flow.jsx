import { useCallback, useState, useContext, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NewNodeContext } from '../../contexts/NewNodeContext';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

function Flow({ diagramNodes, diagramEdges, nodeTypes }) {
  const { newNode, addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const [nodes, setNodes] = useState(diagramNodes);
  const [edges, setEdges] = useState(diagramEdges);

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

  // Listen for changes in newNode
  useEffect(() => {
    if (newNode) {
      // Add new node to the nodes list
      setNodes((currentNodes) => [...currentNodes, newNode.node]);

      // Add new edge to the edges list
      setEdges((currentEdges) => [...currentEdges, newNode.edge]);
    }
  }, [newNode]);

  return (
    <NewNodeContext.Provider
      value={{
        newNode,
        addNewNode,
        getSourceHandle,
        getTargetHandle,
      }}
    >
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
    </NewNodeContext.Provider>
  );
}

export default Flow;
