import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";

// Styles (if using Tailwind or custom CSS)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);