import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { SurveyListContext } from '../../contexts/SurveyListContext';
import { useUserContext } from '../../contexts/UserContext';
import { edgeStyles } from '../shared/shared-component-styles';
import { generateEdgeId } from '../../utils/generate-edge-id';
import { generateNodeId } from '../../utils/generate-node-id';
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { openedSurveyList, nodePosition } = useContext(SurveyListContext);
  const { addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const { accountData } = useUserContext();

  const namePrefix = survey.topic.replace(/\s/g, '');
  const elementNames = [
    `${namePrefix}-A1`,
    `${namePrefix}-A2`,
    `${namePrefix}-A3`,
  ];

  const surveyJson = {
    showCompletedPage: false,
    elements: [
      {
        name: elementNames[0],
        title: `${survey.q1}`,
        type: 'text',
      },
      {
        name: elementNames[1],
        title: `${survey.q2}`,
        type: 'text',
      },
      {
        name: elementNames[2],
        title: `${survey.q3}`,
        type: 'text',
      },
    ],
  };

  // Utility function to calculate the offset
  const calculateOffset = (edgePosition, nodePosition) => {
    const largeOffsetX = 200 + Math.random() * 500; // New range for x offset: 200 to 700
    const smallOffsetX = 200 + Math.random() * 200; // New range for x offset: 200 to 400
    const largeOffsetY = 200 + Math.random() * 500; // New range for y offset: 200 to 700
    const smallOffsetY = 200 + Math.random() * 200; // New range for y offset: 200 to 400
    let position;

    switch (edgePosition) {
      case 'top':
        position = {
          x:
            nodePosition.x +
            (Math.random() < 0.5 ? -largeOffsetX : largeOffsetX),
          y: nodePosition.y + largeOffsetY,
        };
        break;
      case 'bottom':
        position = {
          x:
            nodePosition.x +
            (Math.random() < 0.5 ? -smallOffsetX : smallOffsetX),
          y: nodePosition.y - largeOffsetY,
        };
        break;
      case 'left':
        position = {
          x: nodePosition.x + largeOffsetX,
          y:
            nodePosition.y +
            (Math.random() < 0.5 ? -smallOffsetY : smallOffsetY),
        };
        break;
      case 'right':
        position = {
          x: nodePosition.x - largeOffsetX,
          y:
            nodePosition.y +
            (Math.random() < 0.5 ? -smallOffsetY : smallOffsetY),
        };
        break;
      default:
        break;
    }

    return position;
  };

  const addTopicNode = async (results) => {
    const sourceHandle = getSourceHandle(openedSurveyList);
    const targetHandle = getTargetHandle(sourceHandle);

    const nodeIds = accountData?.diagram?.nodes?.map((node) => node.id) || [];
    const nodeId = await generateNodeId(nodeIds);
    console.log('Generated Node ID:', nodeId);

    const node = {
      id: nodeId,
      type: 'topicNode',
      position: calculateOffset(targetHandle, nodePosition),
      data: {
        topic: survey.topic,
        questions: [survey.q1, survey.q2, survey.q3],
        results: results,
      },
    };

    const edgeIds = accountData?.diagram?.edges?.map((edge) => edge.id) || [];
    const edgeId = await generateEdgeId(edgeIds);
    console.log('Generated Edge ID:', edgeId);

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

    addNewNode({ node, edge });
  };
  const surveyComplete = useCallback(async (sender) => {
    const results = sender.data;
    await addTopicNode(results);
  });

  const surveyModel = new Model(surveyJson);
  surveyModel.onComplete.add(surveyComplete);

  return <Survey model={surveyModel} />;
}

export default TopicSurvey;
