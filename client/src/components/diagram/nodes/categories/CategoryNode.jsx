import React from 'react';
import { Handle, Position } from 'reactflow';
import SurveyList from '../../diagram-components/survey-list/SurveyList';
function CategoryNode({
  categoryName,
  topType,
  rightType,
  bottomType,
  leftType,
  isConnectable,
  categoryBrief,
  surveys,
}) {
  return (
    <div
      style={{
        height: 'auto',
        width: 450,
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <h1>{categoryName}</h1>
      <p>{categoryBrief}</p>
      <SurveyList surveys={surveys} />
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
        id={rightType}
        type="target"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CategoryNode;
