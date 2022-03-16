import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UtilisateurContextProvider } from "./context/userContext"
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilisateurContextProvider>
        <App />
      </UtilisateurContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

