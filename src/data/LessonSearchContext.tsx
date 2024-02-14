import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';


interface LessonSearchContextProps {
  lessonSearch: string;
  setLessonSearch: Dispatch<SetStateAction<string>>;
}

const LessonSearchContext = createContext<LessonSearchContextProps | undefined>(undefined);

interface LessonSearchProviderProps {
  children: ReactNode;
}

export const LessonSearchProvider: React.FC<LessonSearchProviderProps> = ({ children }) => {
  const [lessonSearch, setLessonSearch] = useState<string>("");

  return (
    <LessonSearchContext.Provider value={{ lessonSearch: lessonSearch, setLessonSearch }}>
      {children}
    </LessonSearchContext.Provider>
  );
};

export const useLessonSearch = (): LessonSearchContextProps => {
  const context = useContext(LessonSearchContext);

  if (!context) {
    throw new Error('useLessonSearch must be used within a LessonSearchProvider');
  }

  return context;
};
