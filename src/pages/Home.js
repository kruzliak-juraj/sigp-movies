import React, { Fragment, useEffect, useState } from "react";

import { Grid, Typography, Pagination } from "@mui/material";
import SearchField from "../components/search/SearchField";
import SearchResult from "../components/search/SearchResult";
import { useSelector } from "react-redux";

const Home = (props) => {
  useEffect(() => {
    props.setPageTitle("Search movies");
  }, []);

  const searchedValue = useSelector((state) => state.movies.searchedValue);
  const [pageNumber, setPageNumber] = useState("1");
  const [returnedMovies, setReturnedMovies] = useState();

  const fireSearch = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=33d9dede&s=${searchedValue}&page=${pageNumber}`
      );
      const data = await response.json();
      data.Response === "True" && setReturnedMovies(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  const handlePageChange = (event, page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    searchedValue && fireSearch();
  }, [pageNumber]);

  return (
    <Fragment>
      <Grid container pb={4} pt={8}>
        <Grid item xs={12} px={2}>
          <Typography component="h1" variant="h6">
            Seach the IMDB database
          </Typography>
        </Grid>
        <SearchField fireSearch={fireSearch} />
      </Grid>
      {returnedMovies && (
        <Fragment>
          <Grid container pb={8}>
            <Grid item xs={12} px={2}>
              <Typography component="h1" variant="h6">
                Results:
              </Typography>
            </Grid>
            {returnedMovies.Search.map((movie) => (
              <SearchResult movie={movie} key={movie.imdbID} />
            ))}
          </Grid>
          <Grid container pb={8}>
            <Pagination
              count={Math.ceil(returnedMovies.totalResults / 10)}
              color="primary"
              onChange={handlePageChange}
            />
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
