import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    favourites: [],
    searchedValue: "",
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter((movie) => movie.id !== action.payload);
    },
    setSearchedValue: (state, action) => {
      state.searchedValue = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer