import React from 'react';
import { Handle, Position } from 'reactflow';

function RootNode({ data }) {
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
      <h1>{data.artistName}</h1>
      <p>{data.primaryContent}</p>
      <p>{data.artistSummary}</p>
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        isConnectable="true"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable="true"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        isConnectable="true"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        isConnectable="true"
      />
    </div>
  );
}

export default RootNode;
