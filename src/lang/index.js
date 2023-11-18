import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en-us';
import pt from './pt-br';
import { ThemeConfig } from '../config/theme.config';


const resources = {
  'enUs': {
    translation: en,
  },
  'ptBr': {
    translation: pt,
  },
};

i18.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: ThemeConfig.lang,
  fallbackLng: ThemeConfig.lang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18;