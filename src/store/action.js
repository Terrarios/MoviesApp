import {
  SET_MOVIES_LIST,
  SET_SORT_MOVIES,
  SET_FILTERED_MOVIES,
  MOVIE_DETAILS,
  IS_LOGGED_IN,
  SET_MOVIES_FAVORITES,
  SET_LIKE,
} from "./actionTypes";

export const setMoviesList = (data) => async (dispatch) => {
  dispatch({
    type: SET_MOVIES_LIST,
    payload: data,
  });
};

export const setSortMoviesBy = (sortedBy, isAscending) => async (dispatch) => {
  dispatch({
    type: SET_SORT_MOVIES,
    sortedBy,
    isAscending,
  });
};

export const setFilterMovies = (value) => async (dispatch) => {
  dispatch({
    type: SET_FILTERED_MOVIES,
    payload: value,
  });
};

export const movieDetails = (data) => async (dispatch) => {
  dispatch({
    type: MOVIE_DETAILS,
    payload: data,
  });
};

export const isLoggedIn = (any) => async (dispatch) => {
  dispatch({
    type: IS_LOGGED_IN,
    payload: any,
  });
};

export const setMoviesFavorites = (moviesFavorites) => async (dispatch) => {
  dispatch({
    type: SET_MOVIES_FAVORITES,
    payload: moviesFavorites,
  });
};

export const setLikedMovie = (movieLike) => async (dispatch) => {
  dispatch({
    type: SET_LIKE,
    payload: movieLike,
  });
};
