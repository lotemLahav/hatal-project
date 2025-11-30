import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/userContext";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import { SignUp } from "./views/signUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LogIn } from "./views/logIn";

const CLIENT_ID = "810578008516-3t5up6ge1ic3kdlio1k4ur6hr44er8g5.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <main className="text-center">
        <UserProvider>
          <SignUp></SignUp>
        </UserProvider>
      </main>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
