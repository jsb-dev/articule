import React, { useState, createContext, useContext } from 'react';
import { HandleTypesContext } from './HandleTypesContext';

const NewNodeContext = createContext();

const NewNodeProvider = ({ children }) => {
  const [newNode, setNewNode] = useState(null);
  const [handleCounter, setHandleCounter] = useState(1);
  const { handleTypes } = useContext(HandleTypesContext);

  const getSourceHandle = (nodeId) => {
    const nodeHandleTypes = handleTypes.find(
      (handleType) => handleType.id === nodeId
    );

    setHandleCounter((prevCount) => (prevCount === 4 ? 1 : prevCount + 1));

    switch (handleCounter) {
      case 1:
        if (nodeHandleTypes.topType === 'source') {
          return 'top';
        } else {
          return 'bottom';
        }
      case 2:
        if (nodeHandleTypes.rightType === 'source') {
          return 'right';
        } else {
          return 'left';
        }
      case 3:
        if (nodeHandleTypes.bottomType === 'source') {
          return 'bottom';
        } else {
          return 'top';
        }
      case 4:
        if (nodeHandleTypes.leftType === 'source') {
          return 'left';
        } else {
          return 'right';
        }
      default:
        return 'left';
    }
  };

  const getTargetHandle = (sourceHandle) => {
    switch (sourceHandle) {
      case 'top':
        return 'bottom';
      case 'right':
        return 'left';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      default:
        return 'left';
    }
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
