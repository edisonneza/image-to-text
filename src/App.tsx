import React from "react";
import "./App.css";
import LanguageSelect from "./components/languageSelector";
import HomeComponent from "./components/home/home";

export default function App() {
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