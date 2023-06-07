import { useCallback, useState, createContext } from 'react';
const SurveyListContext = createContext();

function SurveyListProvider({ children }) {
  const [openedSurveyList, setOpenedSurveyList] = useState(null);

  const openSurveyList = useCallback((nodeId) => {
    setOpenedSurveyList(nodeId);
  }, []);

  return (
    <SurveyListContext.Provider value={{ openedSurveyList, openSurveyList }}>
      {children}
    </SurveyListContext.Provider>
  );
}

export { SurveyListContext, SurveyListProvider };
