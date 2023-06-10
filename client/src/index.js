import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './contextapi/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <Router>
      <App />
    </Router>
    </UserContextProvider>
  </React.StrictMode>
);
