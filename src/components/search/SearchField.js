import { Fragment, useEffect, useState } from "react";

import { moviesActions } from "../../context/movies";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Button,
  OutlinedInput,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = (props) => {
  const dispatch = useDispatch();
  const searchedContextValue = useSelector(
    (state) => state.movies.searchedValue
  );
  const [searchedValue, setSearchedValue] = useState("");
  const setSearchedContextValue = (value) => {
    dispatch(moviesActions.setSearchedValue(value));
  };

  useEffect(() => {
    setSearchedValue(searchedContextValue);
  }, [searchedContextValue]);

  return (
    <Fragment>
      <Grid item xs={8} md={4} px={2}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ my: 1, mr: 1, width: "100%" }} variant="outlined">
            <OutlinedInput
              size="small"
              id="search-input"
              value={searchedValue}
              onChange={(event) => setSearchedContextValue(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={2} alignSelf="center">
        <Button color="primary" variant="contained" onClick={props.fireSearch}>
          Search
        </Button>
      </Grid>
    </Fragment>
  );
};

export default SearchField;
