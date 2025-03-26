import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found!");
}

// ✅ Ensure service worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("✅ Service Worker Registered"))
    .catch((error) => console.error("❌ Service Worker Registration Failed", error));
}