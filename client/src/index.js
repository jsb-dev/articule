import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import env from 'react-dotenv';
import 'normalize.css';

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_REDIRECT_URI,
} = env;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    clientId={REACT_APP_AUTH0_CLIENT_ID}
    scope="openid profile email"
    authorizationParams={{
      redirect_uri: REACT_APP_AUTH0_REDIRECT_URI,
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
