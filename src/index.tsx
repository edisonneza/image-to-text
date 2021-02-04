import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import "./i18nextInit";

console.log("%cThanks for being here! Email me if you have suggestions or projects to collaborate :)", "background-color:white;padding:5px 12px;border-radius:8px;font-size:20px;color:red;");
console.log("%cedisonneza.dev@gmail.com", "background-color:white;padding:8px 16px;border-radius:8px;font-size:26px;color:red;");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
