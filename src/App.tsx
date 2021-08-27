import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/refresh_token"
        : "https://personen.herokuapp.com/refresh_token",
      {
        method: "POST",
        credentials: "include",
        mode: "no-cors"
      }
    ).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  return loading ? <CircularProgress /> : <Routes />;
};
