import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  favoritesMovies,
  moviesDetailsReducer,
  moviesReducer,
  moviesTrailerReducer,
  movieLikes,
} from "./reducer";

const reducers = combineReducers({
  moviesList: moviesReducer,
  movieDetails: moviesDetailsReducer,
  movieTrailer: moviesTrailerReducer,
  auth: authReducer,
  favoritesList: favoritesMovies,
  likesList: movieLikes,
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
