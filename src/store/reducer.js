import {
  SET_MOVIES_LIST,
  SET_SORT_MOVIES,
  SET_FILTERED_MOVIES,
  MOVIE_DETAILS,
  IS_LOGGED_IN,
  MOVIE_TRAILER,
  LOGIN,
  LOGOUT,
  SET_MOVIES_FAVORITES,
  SET_LIKE
} from "./actionTypes";

const initialState = {
  sortedBy: "rank",
  isAscending: true,
  searchInput: "",
  movieLikes: {},
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES_LIST:
      return { ...state, moviesList: action.payload };
    case SET_SORT_MOVIES:
      return {
        ...state,
        sortedBy: action.sortedBy || state.sortedBy,
        isAscending: action.isAscending === !null,
      };
    case SET_FILTERED_MOVIES:
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};

export const moviesDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_DETAILS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const logButtons = (state = {}, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const moviesTrailerReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_TRAILER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export const favoritesMovies = (state = {}, action) => {
  switch (action.type) {
    case SET_MOVIES_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

export const movieLikes = (state ={}, action) => {
  switch (action.type) {
    case SET_LIKE:
      return {...state, data: action.payload };
      default:
        return state;
  }
};

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, isLoggedIn: true };

    case LOGOUT:
      return {
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
