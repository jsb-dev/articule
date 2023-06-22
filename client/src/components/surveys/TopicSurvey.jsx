import React, { useCallback, useContext, useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { SurveyListContext } from '../../contexts/SurveyListContext';
import { edgeStyles } from '../shared/shared-component-styles';
import generateEdgeId from '../../utils/generate-edge-id';

// Modern theme
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { openedSurveyList, nodePosition } = useContext(SurveyListContext);
  const { addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);

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

  const nodeId = `${namePrefix}Node`;

  // Utility function to calculate the offset
  const calculateOffset = (targetHandle, nodePosition) => {
    const smallOffsetX = Math.floor(Math.random() * 100) + 200;
    const smallOffsetY = Math.floor(Math.random() * 100) + 200;
    const largeOffsetX = Math.floor(Math.random() * 200) + 500;
    const largeOffsetY = Math.floor(Math.random() * 200) + 500;

    let position = { x: 0, y: 0 };

    switch (targetHandle) {
      case 'top':
        position = {
          x:
            nodePosition.x +
            (Math.random() < 0.5 ? -smallOffsetX : smallOffsetX),
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

    const edgeId = await generateEdgeId();
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
