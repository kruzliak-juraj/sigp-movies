import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../context/movies";
import FavouriteMovie from "../components/favourites/FavouriteMovie";

const Favourites = (props) => {
  useEffect(() => {
    props.setPageTitle("Favourites");
  }, []);

  const dispatch = useDispatch();
  const removeFavourite = (event) => {
    const newFavourites = localFavourites.filter(
      (movie) => movie.id !== event.target.id
    );
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
    setLocalFavourites(JSON.parse(localStorage.getItem("favourites")));
    dispatch(moviesActions.removeFavourite(event.target.id));
  };

  const [localFavourites, setLocalFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites"))
  );
  const favourites = useSelector((state) => state.movies.favourites);

  return (
    <Grid container pb={8}>
      {favourites.length === 0 && localFavourites.length === 0 && (
        <Typography paragraph pt={4}>
          No favourites added
        </Typography>
      )}
      {favourites.length > 0 &&
        favourites.map((movie) => (
          <FavouriteMovie
            removeFavourite={removeFavourite}
            movie={movie}
            key={movie.id}
          />
        ))}
      {favourites.length === 0 &&
        localFavourites.length !== 0 &&
        localFavourites.map((movie) => (
          <FavouriteMovie
            removeFavourite={removeFavourite}
            movie={movie}
            key={movie.id}
          />
        ))}
    </Grid>
  );
};

export default Favourites;
