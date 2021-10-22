import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../context/movies";

import { Grid, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const MovieDetail = (props) => {
  const history = useHistory();
  const params = useParams();
  const favourites = useSelector((state) => state.movies.favourites);
  const [returnedMovie, setReturnedMovie] = useState();
  const [isFavourite, setIsFavourite] = useState();
  const fireSearch = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=33d9dede&i=${params.movieId}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setReturnedMovie(data);
        setIsFavourite(favourites.some((item) => item.id === data.imdbID));
      } else {
        history.push("/404");
      }
    } catch (e) {
      console.error(e.toString);
    }
  };

  useEffect(() => {
    props.setPageTitle("Movie detail");
    fireSearch();
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const dispatch = useDispatch();
  const removeFavourite = () => {
    setIsFavourite(false);
    dispatch(moviesActions.removeFavourite(params.movieId));
  };
  const addFavourite = () => {
    setIsFavourite(true);
    dispatch(
      moviesActions.addFavourite({
        title: returnedMovie.Title,
        id: returnedMovie.imdbID,
      })
    );
  };

  return (
    <Fragment>
      {returnedMovie && (
        <Grid container pt={4} spacing={2} px={2}>
          <Grid item xs={8} md={9}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" gutterBottom>
                  {returnedMovie.Title}
                  {isFavourite ? (
                    <StarIcon
                      sx={{ pl: 2, fontSize: "2rem", cursor: "pointer" }}
                      onClick={removeFavourite}
                    />
                  ) : (
                    <StarBorderIcon
                      sx={{ pl: 2, fontSize: "2rem", cursor: "pointer" }}
                      onClick={addFavourite}
                    />
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Year:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Year}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Type:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Type}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Genre:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Genre}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Awards:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Awards}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Actors:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Actors}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Writers:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Writer}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="caption" fontWeight="bold">
                  Plot:
                </Typography>
                <Typography paragraph variant="body2">
                  {returnedMovie.Plot}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} display={{ xs: "none", xl: "inherit" }}></Grid>
          <Grid item xs>
            <img
              src={`${returnedMovie.Poster}`}
              alt={`${returnedMovie.Title}`}
              style={{ maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default MovieDetail;
