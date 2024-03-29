import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import { ApolloClient, InMemoryCache, ApolloLink, Observable, createHttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

import "./index.css";

const cache = new InMemoryCache({});
console.log(
  process.env.NODE_ENV,
  process.env.NODE_ENV === "development",
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/refresh_token"
    : "https://personen.herokuapp.com/refresh_token"
);

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  ...({ credentials: "include", withCredentials: true }) as any,
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: async () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp }: any = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(
          process.env.NODE_ENV === "development"
            ? "http://localhost:4000/refresh_token"
            : "https://personen.herokuapp.com/refresh_token",
          {
            method: "POST",
            credentials: "include",
          }
        );
      },
      handleFetch: accessToken => {
        setAccessToken(accessToken);
      },
      handleError: err => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }) as any,
    requestLink,
    createHttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/graphql"
          : "https://personen.herokuapp.com/graphql",
      credentials: "include",
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
