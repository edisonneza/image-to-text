import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./components/languageSelector";
import TextField from "@material-ui/core/TextField";

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="main">
    <div className="language-select">
        <LanguageSelect />
    </div>
    <div className="App">
      <div className="example-text">
        <p>{t("hello_welcome_to_react")}</p>
        <p>{t("this_is_an_example")}</p>
        <TextField
          label={t("please_enter_name")}
          color="primary"
          variant="outlined"
          className='field'
        />
      </div>
    </div>
    </div>
  );
}