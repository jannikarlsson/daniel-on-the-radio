import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const isDev = process.env.NODE_ENV === 'development';

root.render(
  isDev ? <App /> : <React.StrictMode><App /></React.StrictMode>
);