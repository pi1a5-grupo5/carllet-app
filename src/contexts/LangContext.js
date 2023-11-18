import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig } from '../config/theme.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18 from '../lang';

const THEME_KEY = '@CARLLET_APP:THEME';

export const LangContext = createContext();

export const useLangContext = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(ThemeConfig.lang);

  const handleLang = async (lang) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, lang);
      setLanguage(lang);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getLang = async () => {
      try {
        const lang = await AsyncStorage.getItem(THEME_KEY);
        if (lang !== null) {
          setLanguage(lang);
          i18.changeLanguage(lang);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getLang();
  }, []);

  return (
    <LangContext.Provider value={{ language, handleLang }}>
      {children}
    </LangContext.Provider>
  );
};