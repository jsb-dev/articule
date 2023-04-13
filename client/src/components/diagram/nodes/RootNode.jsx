import React from 'react';
import { Handle, Position } from 'reactflow';

function RootNode({
  data,
  topType,
  rightType,
  bottomType,
  leftType,
  isConnectable,
}) {
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
      <h1>{data.artistName}</h1>
      <p>{data.primaryContent}</p>
      <p>{data.artistSummary}</p>
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

export default RootNode;
