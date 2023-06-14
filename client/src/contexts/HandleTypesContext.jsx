import React, { createContext, useState } from 'react';

const HandleTypesContext = createContext();

const HandleTypesProvider = ({ children }) => {
  const [handleTypes, setHandleTypes] = useState([]);

  const addHandleType = (nodeId, topType, rightType, bottomType, leftType) => {
    setHandleTypes((prevTypes) => [
      ...prevTypes,
      {
        id: nodeId,
        topType,
        rightType,
        bottomType,
        leftType,
      },
    ]);
  };

  return (
    <HandleTypesContext.Provider value={{ handleTypes, addHandleType }}>
      {children}
    </HandleTypesContext.Provider>
  );
};

export { HandleTypesContext, HandleTypesProvider };
