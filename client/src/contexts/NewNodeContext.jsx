import React, { useState, createContext } from 'react';

export const NewNodeContext = createContext();

export const NewNodeProvider = ({ children }) => {
  const [sourceNode, setSourceNode] = useState(null);
  const [newNode, setNewNode] = useState(null);

  const addNewNode = (node) => {
    setNewNode(node);
  };

  return (
    <NewNodeContext.Provider value={{ newNode, addNewNode }}>
      {children}
    </NewNodeContext.Provider>
  );
};
