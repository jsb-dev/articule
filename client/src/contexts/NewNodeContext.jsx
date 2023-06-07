import React, { useState, createContext } from 'react';

const NewNodeContext = createContext();

const NewNodeProvider = ({ children }) => {
  const [newNode, setNewNode] = useState(null);
  const [handleCounter, setHandleCounter] = useState(1);

  const getSourceHandle = () => {
    const result = handleCounter;
    setHandleCounter((prevCount) => (prevCount === 3 ? 1 : prevCount + 1));
    return result;
  };

  const getTargetHandle = () => {
    // Returns a random number between 1 and 4
    return Math.floor(Math.random() * 4) + 1;
  };

  const addNewNode = (node) => {
    setNewNode(node);
  };

  return (
    <NewNodeContext.Provider
      value={{
        newNode,
        addNewNode,
        getSourceHandle,
        getTargetHandle,
      }}
    >
      {children}
    </NewNodeContext.Provider>
  );
};

export { NewNodeContext, NewNodeProvider };
