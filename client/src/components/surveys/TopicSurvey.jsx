import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { edgeStyles } from '../shared/shared-component-styles';
import { SurveyListContext } from '../../contexts/SurveyListContext';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const { openedSurveyList } = useContext(SurveyListContext);
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

    const sourceHandle = getSourceHandle(openedSurveyList);
    const targetHandle = getTargetHandle(sourceHandle);

    const edge = {
      source: openedSurveyList,
      sourceHandle: sourceHandle,
      target: nodeId,
      targetHandle: targetHandle,
      id: `${openedSurveyList}-${sourceHandle}-to-${nodeId}-${targetHandle}`,
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
