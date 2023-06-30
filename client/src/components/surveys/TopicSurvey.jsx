import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { SurveyListContext } from '../../contexts/SurveyListContext';
import { useUserContext } from '../../contexts/UserContext';
import addTopicNode from '../../utils/add-topic-node';
import 'survey-core/modern.min.css';

function TopicSurvey({ survey, handleClose }) {
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
        isRequired: true,
        minLength: 1,
      },
      {
        name: elementNames[1],
        title: `${survey.q2}`,
        type: 'text',
        isRequired: true,
        minLength: 1,
      },
      {
        name: elementNames[2],
        title: `${survey.q3}`,
        type: 'text',
        isRequired: true,
        minLength: 1,
      },
    ],
  };

  const surveyComplete = useCallback(async (sender) => {
    const results = sender.data;
    const sourceHandle = getSourceHandle(openedSurveyList);
    const targetHandle = getTargetHandle(sourceHandle);
    const nodeIds = accountData?.diagram?.nodes?.map((node) => node.id) || [];
    const edgeIds = accountData?.diagram?.edges?.map((edge) => edge.id) || [];

    const { node, edge } = await addTopicNode(
      results,
      survey,
      nodePosition,
      openedSurveyList,
      sourceHandle,
      targetHandle,
      nodeIds,
      edgeIds
    );

    addNewNode({ node, edge });

    handleClose();
  });

  const surveyModel = new Model(surveyJson);
  surveyModel.onComplete.add(surveyComplete);

  return <Survey model={surveyModel} />;
}

export default TopicSurvey;
