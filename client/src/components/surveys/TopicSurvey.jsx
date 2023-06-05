import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { edgeStyles } from '../shared/Styles';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { addNewNode } = useContext(NewNodeContext);
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

  const addTopicNode = async (results) => {
    const edge = {
      source: '', // access the sourceNode from the NewNodeContext
      sourceHandle: '', // requires a function in the NewNodeContext to have a running counter between 1-3 which resets
      // the result will determine the handle as 1 = top, 2 = left || right (one of these will be invalid, so it will choose the valid one), 3 = bottom
      // the resulting handle will be accessed here via the context for sourceHandle
      target: nodeId,
      targetHandle: '', // requires a function which chooses a random nunmber between 1-4
      // the result will determine the handle as 1 = top, 2 = left, 3 = right, 4 = bottom
      id: '', // `${namePrefix}+${sourceHandle}+${targetHandle}+${the 1-4 result * a random number between 1 and another random number between 100-1000}`,
      deletable: 'true',
      focusable: 'true',
      style: edgeStyles,
    };

    const node = {
      id: nodeId,
      type: 'topicNode',
      position: { x: 0, y: 0 }, // TODO: This should be calculated based on the position of the source node and the targetHandle so it looks right
      data: {
        topic: survey.topic,
        questions: [survey.q1, survey.q2, survey.q3],
        results: results,
      },
    };

    // Add the new node and edge to the context
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
