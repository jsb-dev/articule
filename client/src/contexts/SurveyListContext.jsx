import { useCallback, useState, createContext } from 'react';

const SurveyListContext = createContext();

function SurveyListProvider({ children }) {
  const [openedSurveyList, setOpenedSurveyList] = useState(null);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });

  const openSurveyList = useCallback((nodeId) => {
    setOpenedSurveyList(nodeId);
  }, []);

  const updateNodePosition = useCallback((position) => {
    setNodePosition(position);
  }, []);

  return (
    <SurveyListContext.Provider
      value={{
        openedSurveyList,
        openSurveyList,
        nodePosition,
        updateNodePosition,
      }}
    >
      {children}
    </SurveyListContext.Provider>
  );
}

export { SurveyListContext, SurveyListProvider };
