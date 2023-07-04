import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { SurveyListContext } from '../../../contexts/SurveyListContext';
import { NewNodeContext } from '../../../contexts/NewNodeContext';
import { useUserContext } from '../../../contexts/UserContext';
import addBlankNode from '../../../utils/add-blank-node';

const AddBlankNodeButton = () => {
  const { openedSurveyList, nodePosition } = useContext(SurveyListContext);
  const { getSourceHandle, getTargetHandle, addNewNode } =
    useContext(NewNodeContext);
  const { accountData } = useUserContext();

  const handleAddBlankNode = async () => {
    const nodeIds = accountData?.diagram?.nodes?.map((node) => node.id) || [];
    const edgeIds = accountData?.diagram?.edges?.map((edge) => edge.id) || [];

    const sourceHandle = getSourceHandle(openedSurveyList);
    const targetHandle = getTargetHandle(sourceHandle);

    const { node, edge } = await addBlankNode(
      nodePosition,
      openedSurveyList,
      sourceHandle,
      targetHandle,
      nodeIds,
      edgeIds
    );

    addNewNode({ node, edge });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleAddBlankNode}>
      Add Blank Node
    </Button>
  );
};

export default AddBlankNodeButton;
