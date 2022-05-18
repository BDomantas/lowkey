import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enResource from '@Root/translations/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enResource,
    },
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
