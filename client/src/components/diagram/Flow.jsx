import { useCallback, useState, useContext, useEffect, useRef } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { SurveyListContext } from '../../contexts/SurveyListContext';
import { useUserContext } from '../../contexts/UserContext';
import { EditNodeContext } from '../../contexts/EditNodeContext';
import requestSaveDiagram from '../../utils/request-save-diagram';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

function Flow({ diagramNodes, diagramEdges, nodeTypes }) {
  const { accountData, setAccountData } = useUserContext();
  const { newNode, addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const { openedSurveyList: nodeId, updateNodePosition } =
    useContext(SurveyListContext);
  const { editSignal } = useContext(EditNodeContext);
  const prevEditSignal = useRef(editSignal);
  const [nodes, setNodes] = useState(diagramNodes);
  const [edges, setEdges] = useState(diagramEdges);

  const getOpenedNodePosition = useCallback(
    (updatedNodes, nodeId) => {
      const targetNode = updatedNodes.find((node) => node.id === nodeId);

      if (targetNode) {
        updateNodePosition(targetNode.position);
      }
    },
    [updateNodePosition]
  );

  useEffect(() => {
    if (prevEditSignal.current !== editSignal) {
      console.log(accountData.diagram);
      requestSaveDiagram(accountData.diagram, accountData._id);
      prevEditSignal.current = editSignal;
    }
  }, [editSignal, accountData]);

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      getOpenedNodePosition(updatedNodes, nodeId);
      setNodes(updatedNodes);
      setAccountData((prevData) => ({
        ...prevData,
        diagram: { nodes: updatedNodes, edges },
      }));
    },
    [nodes, nodeId, getOpenedNodePosition, setAccountData, edges]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      setAccountData((prevData) => ({
        ...prevData,
        diagram: { nodes, edges: updatedEdges },
      }));
    },
    [setEdges, nodes, setAccountData, edges]
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        requestSaveDiagram(nodes, newEdges, accountData._id);
        return newEdges;
      });
    },
    [setEdges, nodes, accountData._id]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      requestSaveDiagram(accountData.diagram, accountData._id);
    }, 5000);

    return () => clearInterval(interval);
  }, [accountData, nodes, edges]);

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
