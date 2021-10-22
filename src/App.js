import React, { useState, Suspense } from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";

import "./App.css";
import { Grid, CircularProgress } from "@mui/material";

import Home from "./pages/Home";
import Nav from "./components/navigation/Nav";

const PageNotFound = React.lazy(() => import("./pages/404"));
const Favourites = React.lazy(() => import("./pages/Favourites"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail"));

const history = createBrowserHistory();

function App() {
  const [pageTitle, setPageTitle] = useState();
  return (
    <Router history={history}>
      <header>
        <Nav pageTitle={pageTitle} />
      </header>
      <Grid component="main" container>
        <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
          <Suspense
            fallback={
              <Grid container item justifyContent="center">
                <CircularProgress size={200} />
              </Grid>
            }
          >
            <Switch>
              <Route path="/" exact>
                <Home setPageTitle={setPageTitle} />
              </Route>
              <Route path="/favourites" exact>
                <Favourites setPageTitle={setPageTitle} />
              </Route>
              <Route path="/movie-detail/:movieId">
                <MovieDetail setPageTitle={setPageTitle} />
              </Route>
              <Route path="*">
                <PageNotFound setPageTitle={setPageTitle} />
              </Route>
            </Switch>
          </Suspense>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
