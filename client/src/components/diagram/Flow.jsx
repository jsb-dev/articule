import { useCallback, useState, useContext, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { SurveyListContext } from '../../contexts/SurveyListContext';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

function Flow({ diagramNodes, diagramEdges, nodeTypes }) {
  const { newNode, addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const { openedSurveyList: nodeId, updateNodePosition } =
    useContext(SurveyListContext);
  const [nodes, setNodes] = useState(diagramNodes);
  const [edges, setEdges] = useState(diagramEdges);

  /*
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    console.log('nodes', nodes),
    [setNodes]

    // a function which iterates through nodes (array of objects) to find the index where
    // nodeId === nodeId, where nodeId is retrieved from surveyListContext and passed in as an argument,
    // then set the x and y values from pos to the value of nodePosition in that context

    // send nodes to server
  );
  */

  const getOpenedNodePosition = (updatedNodes, nodeId) => {
    // find node by nodeId
    const targetNode = updatedNodes.find((node) => node.id === nodeId);

    // If node is found, update position in context
    if (targetNode) {
      updateNodePosition(targetNode.position);
    }
  };

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);

      getOpenedNodePosition(updatedNodes, nodeId);

      setNodes(updatedNodes);
    },
    [nodes, nodeId, updateNodePosition]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (newNode) {
      setNodes((currentNodes) => [...currentNodes, newNode.node]);
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
