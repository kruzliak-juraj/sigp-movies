import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const FavouriteMovie = (props) => {
  return (
    <Grid item xs={12} md={6} px={2} pt={4}>
      <Card>
        <CardContent>
          <Typography variant="caption" component="p">
            Title:
          </Typography>
          <Typography paragraph sx={{ display: "inline-block" }}>
            {props.movie.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/movie-detail/${props.movie.id}`}
            variant="contained"
          >
            View details
          </Button>
          <Button
            onClick={props.removeFavourite}
            id={props.movie.id}
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Remove favourite
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FavouriteMovie