/**
 * RCG INDEX UPLINK - v10.13.30-STABLE
 * Protocol: Neural Sync [PRODUCTION_NOMINAL]
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("CRITICAL ERROR: Failed to locate RCG-CORE-MOUNT node.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}