import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-7zeb373px20p31o0.us.auth0.com"
    clientId="9Aj1NRJGPsjDlZ1FpwyYVEwT4kOVdAhy"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
