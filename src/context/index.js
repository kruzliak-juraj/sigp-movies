import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movies';
export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export default store;