import React, { useState, useEffect } from 'react';
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
  const [categoryBrief, setCategoryBrief] = useState('');
  const [surveys, setSurveys] = useState([]);

  const category = categoryName.replace(/\s+/g, '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}diagram/get/category?category=${category}`
        );
        const data = await response.json();
        setCategoryBrief(data.categoryBrief);
        setSurveys(data.surveys);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category, REACT_APP_API_URL]);

  console.log('categoryBrief:', categoryBrief);
  console.log('surveys:', surveys);

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
      <p>{categoryBrief}</p>
      <ul>
        {surveys.map((survey) => (
          <li key={survey}>{survey}</li>
        ))}
      </ul>
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
