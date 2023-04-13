import React from 'react';
import { Handle, Position } from 'reactflow';
import env from 'react-dotenv';

function CategoryNode({
  categoryName,
  topType,
  rightType,
  bottomType,
  leftType,
  isConnectable,
}) {
  const { REACT_APP_API_URL } = env;

  // send get request to the `${REACT_APP_API_URL}diagram/category/${data.categoryName}` endpoint

  return (
    <div
      style={{
        height: 'auto',
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <h1>{categoryName}</h1>
      <p>
        {
          // categoryBrief (in the response from the get request)
        }
      </p>
      {
        // List all the ids from the category TopicCollection surveys array here
        // (in the response from the get request)
      }
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
