import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/userContext";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import { SignUp } from "./views/signUp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="text-center">
      <UserProvider>
        <SignUp></SignUp>
      </UserProvider>
    </main>
  </React.StrictMode>
);
