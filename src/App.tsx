import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./components/languageSelector";
import HomeComponent from "./components/home/home";
import InfoIcon from '@material-ui/icons/Info';
import { Button } from "@material-ui/core";
import AlertDialog from "./components/home/about";

export default function App() {
  const { t } = useTranslation();
  document.title = t('app_title');
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className="main">
      <div className="AppBar">
        <div className="about-icon">
          <Button size="small" onClick={() => setOpen(true)}>
            <InfoIcon />
          </Button>
        </div>
        <div className="language-select">
          <LanguageSelect />
        </div>
      </div>
      <div className="App">
        <HomeComponent />
        <AlertDialog open={open} handleClose={() => setOpen(false)} />
      </div>
    </div >
  );
}