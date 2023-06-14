import React, { useContext, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import SurveyList from '../../survey-list/SurveyList';
import { HandleTypesContext } from '../../../../../contexts/HandleTypesContext';

function CategoryNode({
  id,
  categoryName,
  topType,
  rightType,
  bottomType,
  leftType,
  isConnectable,
  categoryBrief,
  surveys,
}) {
  const { addHandleType } = useContext(HandleTypesContext);

  useEffect(() => {
    addHandleType(id, topType, rightType, bottomType, leftType);
  }, [id, topType, rightType, bottomType, leftType]);

  return (
    <div
      style={{
        height: 'auto',
        maxWidth: 450,
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <h1>{categoryName}</h1>
      <p>{categoryBrief}</p>
      <SurveyList surveys={surveys} nodeId={id} />
      <Handle
        id="top"
        type={topType}
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        id="bottom"
        type={bottomType}
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <Handle
        id="left"
        type={leftType}
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        id="right"
        type={rightType}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CategoryNode;
