import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/locales/en/translation.json";
import translationSQ from "./assets/locales/sq/translation.json";

// let options: Backend.I18NextXhrBackend.BackendOptions = {
//   loadPath: '{{lng}}/{{ns}}'
// };

const fallbackLng = ["en"];
const availableLanguages = ["en", "sq"];

const resources = {
  en: {
    translation: translationEN
  },
  sq: {
    translation: translationSQ
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
