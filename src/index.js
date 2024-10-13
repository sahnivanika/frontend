import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from "./store";
// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root and render your app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
     <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

