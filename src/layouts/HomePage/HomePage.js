import React, { useEffect } from "react";
import "./HomePage.css";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState } from "recoil";
import { creditsAtom } from "../../state/user";
import { backendServerUrl, getUserInfo } from "../../utils/api";

const HomePage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [credits, setCredits] = useRecoilState(creditsAtom);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) window.location.href = "/login";
    else {
      initializeHomePage();
    }
  }, [isLoading]);

  const initializeHomePage = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: backendServerUrl,
        scope: "read:profile",
      },
    });

    let userInfo = await getUserInfo(token);
    setCredits(userInfo.credits);
  };

  return (
    <div className="home-page">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <React.Fragment>
          HomePage
          <hr />
          {isAuthenticated && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>Credits: {credits === -100 ? "Loading..." : credits}</p>
            </div>
          )}
          <hr />
          <br />
          <LogoutButton />
        </React.Fragment>
      )}
    </div>
  );
};

export default HomePage;
