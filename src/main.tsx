import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./components/Toast/Toast";
import "./index.css";
import { app, analytics } from "./lib/firebase";

// Initialize Firebase
if (import.meta.env.PROD && typeof window !== "undefined") {
  // Make app and analytics available globally for debugging in production
  window.firebaseApp = app;
  window.firebaseAnalytics = analytics;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
