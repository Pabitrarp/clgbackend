import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
