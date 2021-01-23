import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Organizer from "./pages/Organizer.js";
import NavBar from "./modules/NavBar.js";
import Listen from "./pages/Listen.js";

import "../utilities.css";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
const App = () => {
  // makes props available in this component
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  });

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    post("/api/login", { token: res.tokenObj.id_token }).then((user) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
          />
      <Router>
        <Skeleton
          path="/"
          userId={userId}
        />
        <Organizer
          path="/songs"
          userId={userId}
        />
        <Listen
          path="/listen"
          userId={userId}
        />
        <Skeleton
          path="/data"
          userId={userId}
        />
        <Skeleton
          path="/import"
          userId={userId}
        />
        <NotFound default />
      </Router>
    </>
  );
}

export default App;