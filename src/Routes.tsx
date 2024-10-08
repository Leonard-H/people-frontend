import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Users from "./pages/Users";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import { useMeQuery } from "./generated/graphql";
import Search from "./pages/Search";
import Person from "./pages/Person";
import { Dashboard } from "./pages/Dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ChangePassword from "./pages/ChangePassword";
// import { EditForm } from "./pages/Edit";
import About from "./pages/About";
// import Edits from "./pages/Edits"

export const Routes: React.FC = () => {
  const { data, loading } = useMeQuery();
  const loggedOut = !(data && data.me && data.me.id) && !loading;
  const prefersDarkMode = data && data.me && data.me.prefersDarkMode;

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/login" component={Login} />
            {loggedOut ? <Redirect to="/login" /> : null}
            <Route exact path="/" component={Dashboard} />
            {data && data.me && data.me.id ? (
              <Redirect from="/login" to="/" />
            ) : null}
            <Route exact path="/register" component={Register} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/person/:id" component={Person} />
            {/*<Route exact path="/edit" component={EditForm} />
            <Route exact path="/edits" component={Edits} />*/}
            <Route exact path="/about" component={About} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
