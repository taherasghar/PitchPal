import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ProfilePictureProvider } from "./context/ProfilePictureProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfilePictureProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ProfilePictureProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
