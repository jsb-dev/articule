import React, { useCallback, useContext } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { NewNodeContext } from '../../contexts/NewNodeContext';
import { edgeStyles } from '../shared/Styles';
import { SurveyListContext } from '../../contexts/SurveyListContext';

// Default V2 theme
// import 'survey-core/defaultV2.min.css';
// Modern theme
import 'survey-core/modern.min.css';

function TopicSurvey({ survey }) {
  const { addNewNode, getSourceHandle, getTargetHandle } =
    useContext(NewNodeContext);
  const { openedSurveyList, openSurveyList } = useContext(SurveyListContext);
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
    // Separate function for edge creation to avoid code repetition
    const createEdge = (sourceHandle) => {
      let targetHandleValue = getTargetHandle();
      let targetHandle;

      // Convert handle counter values to corresponding handle strings
      const handleNumberToString = (value) => {
        switch (value) {
          case 1:
            return 'top';
          case 2:
            return 'left';
          case 3:
            return 'right';
          case 4:
            return 'bottom';
          default:
            // Handle default case
            break;
        }
      };

      targetHandle = handleNumberToString(targetHandleValue);

      // Ensure that targetHandle does not equal sourceHandle
      while (targetHandle === sourceHandle) {
        targetHandleValue = getTargetHandle();
        targetHandle = handleNumberToString(targetHandleValue);
      }

      return {
        source: openedSurveyList,
        sourceHandle,
        target: nodeId,
        targetHandle,
        id: '', // concatenate openedSurveyList + sourceHandle + edgeCounter (make a context function for this)
        deletable: 'true',
        focusable: 'true',
        style: edgeStyles,
      };
    };

    // Call the counter function here
    const counterValue = getSourceHandle();
    let sourceHandle;

    switch (counterValue) {
      case 1:
        sourceHandle = 'top';
        break;
      case 2:
        // check context for the type of handle the CategoryNode's "left" node is
        // if the node's "left" handle is type "target", then the sourceHandle should be "right", otherwise it should be "left"
        break;
      case 3:
        sourceHandle = 'bottom';
        break;
      default:
        // Handle default case
        break;
    }

    const edge = createEdge(sourceHandle);

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
