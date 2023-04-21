import { createContext, useContext, useState } from 'react';

const CategoryNodeContext = createContext();

export const useCategoryNodeContext = () => {
  return useContext(CategoryNodeContext);
};

export const CategoryNodeProvider = ({ children }) => {
  const [loadedCategoryNodes, setLoadedCategoryNodes] = useState(0);

  const incrementLoadedCategoryNodes = () => {
    setLoadedCategoryNodes((count) => count + 1);
  };

  return (
    <CategoryNodeContext.Provider
      value={{ loadedCategoryNodes, incrementLoadedCategoryNodes }}
    >
      {children}
    </CategoryNodeContext.Provider>
  );
};
