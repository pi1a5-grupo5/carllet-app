import React, { createContext, useContext, useState } from 'react';
import { ThemeConfig } from '../config/theme.config';

export const LangContext = createContext();

export const useLangContext = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(ThemeConfig.lang); // default language

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};