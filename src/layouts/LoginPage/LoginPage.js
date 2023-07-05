import "./LoginPage.css";
import React from "react";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && isAuthenticated) {
    window.location.href = "/";
  }

  return (
    <div className="login-page">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <React.Fragment>
          LoginPage
          <br />
          <LoginButton />
        </React.Fragment>
      )}
    </div>
  );
};

export default LoginPage;
