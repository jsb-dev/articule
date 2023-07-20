import React, { createContext, useState } from 'react';

export const EditNodeContext = createContext({
  editSignal: 0,
  triggerEdit: () => {},
});

export const EditNodeProvider = ({ children }) => {
  const [editSignal, setEditSignal] = useState(0);

  const triggerEdit = () => {
    setEditSignal((editSignal) => (editSignal ? 0 : 1));
  };

  return (
    <EditNodeContext.Provider value={{ editSignal, triggerEdit }}>
      {children}
    </EditNodeContext.Provider>
  );
};
