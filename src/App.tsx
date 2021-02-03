import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./components/languageSelector";
import HomeComponent from "./components/home/home";

export default function App() {
  const { t } = useTranslation();
  document.title = t('app_title');

  return (
    <div className="main">
      <div className="language-select">
        <LanguageSelect />
      </div>
      <div className="App">
        <HomeComponent />

      </div>
    </div>
  );
}