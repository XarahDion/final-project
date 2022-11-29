import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './components/App';
import UserProvider from './components/hooks/UserContext';
import {Auth0Provider} from "@auth0/auth0-react"

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain} clientId={clientId} redirectUri={window.location.origin}
    >
    <UserProvider>
    <App />
    </UserProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
