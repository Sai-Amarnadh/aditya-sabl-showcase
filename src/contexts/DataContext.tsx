import { createContext, useState, useContext, ReactNode } from 'react';

interface DataContextType {
  dataChanged: number;
  triggerDataChange: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataChanged, setDataChanged] = useState(0);

  const triggerDataChange = () => {
    setDataChanged(prev => prev + 1);
  };

  return (
    <DataContext.Provider value={{ dataChanged, triggerDataChange }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
