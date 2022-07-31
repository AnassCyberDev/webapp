import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import App from './App';
import reportWebVitals from './reportWebVitals';


i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpApi)
  .init({
   

    fallbackLng: "en",
    detection:{
      order: ['cookie','htmlTag',  'localStorage', 'path', 'subdomain'],
      caches:['cookie']
    },
    backend:{
      loadPath: 'assets/locales/{{lng}}/translation.json'
    }

  });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
