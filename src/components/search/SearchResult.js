import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const SearchResult = (props) => {
  return (
    <Fragment>
      <Grid item xs={12} md={6} px={2}>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} md={6}>
                <img
                  src={`${props.movie.Poster}`}
                  alt={`${props.movie.Title}`}
                  style={{ maxWidth: "100%" }}
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <Typography variant="caption">Title:</Typography>
                <Typography paragraph>{props.movie.Title}</Typography>
                <Typography variant="caption">Year:</Typography>
                <Typography paragraph variant="body2">
                  {props.movie.Year}
                </Typography>
                <Typography variant="caption">Type:</Typography>
                <Typography paragraph variant="body2">
                  {props.movie.Type}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/movie-detail/${props.movie.imdbID}`}
                >
                  View details
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default SearchResult;
