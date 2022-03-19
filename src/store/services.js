import {
  movieDetails,
  setMoviesFavorites,
  setMoviesList,
  setLikedMovie,
} from "./action";
import { dummyMovies } from "./data/movies";
import {
  createUserWithEmailAndPassword,
  getAuth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "../firebase/firebase-config";
import { login, logout } from "./auth.action";
import { store } from "./index";

const API_URL = "https://imdb-api.com/en/API";

// Usuarios:
// const API_KEY = "k_xs8pu9i3";
// const API_KEY = "k_hgf4an8v";
const API_KEY = "k_sudvv5zb";

const API_PARAMS = {
  homeCountry: "US",
  purchaseCountry: "US",
  currentCountry: "US",
};

const API_HEADERS = {
  "x-rapidapi-host": "imdb8.p.rapidapi.com",
  "x-rapidapi-key": API_KEY,
};

export const fetchMoviesList = (type) => async (dispatch) => {
  fetch(
    `${API_URL}/${type}/${API_KEY}`,
    { params: API_PARAMS },
    { headers: API_HEADERS }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.errorMessage === "") {
        dispatch(setMoviesList(data.items));
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      dispatch(setMoviesList(dummyMovies));
    });
};

export const fetchMoviesDetails = (idMovie) => async (dispatch) => {
  fetch(
    `${API_URL}/Title/${API_KEY}/${idMovie}`,
    { params: API_PARAMS },
    { headers: API_HEADERS }
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch(movieDetails(data));
    });
};

export const fetchMoviesTrailer = (idMovie) => async (dispatch) => {
  fetch(
    `${API_URL}/Trailer/${API_KEY}/${idMovie}`,
    { params: API_PARAMS },
    { headers: API_HEADERS }
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "moviesTrailer",
        payload: data,
      });
    });
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then(({ user }) => {
      const { uid, email, displayName, accessToken } = user;

      sessionStorage.setItem("token", user?.accessToken);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ uid, email, displayName, accessToken })
      );

      dispatch(login(uid, email, displayName, accessToken));
    });
  };
};

export const loginWithEmail = (email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { uid, email, displayName, accessToken } = user;

        sessionStorage.setItem("token", user?.accessToken);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ uid, email, displayName, accessToken })
        );

        dispatch(login(uid, email, displayName, accessToken));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.email, user.displayName));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch(logout());
  };
};

export const fetchDataMoviesFavorites = () => async (dispatch) => {
  const response = await fetch(
    "https://mentos-app-default-rtdb.firebaseio.com/favorites.json"
  );
  const responseData = await response.json();
  const loadedMovies = [];

  const moviesList = store.getState().moviesList.moviesList;
  // const user =
  //   store.getState().auth &&
  //   store.getState().auth.user &&
  //   store.getState().auth.user.uid;

  if (moviesList) {
    for (const key in responseData) {
      const dataMovies =
        moviesList &&
        moviesList.filter((data) => data.id === responseData[key].movieId);
      // const dataMovies =
      //   moviesList &&
      //   moviesList.filter((data) => user === responseData[key].userId);
      loadedMovies.push({
        key: key,
        title: dataMovies && dataMovies[0] && dataMovies[0].title,
        crew: dataMovies && dataMovies[0] && dataMovies[0].crew,
        id: dataMovies && dataMovies[0] && dataMovies[0].id,
        rank: dataMovies && dataMovies[0] && dataMovies[0].rank,
        fullTitle: dataMovies && dataMovies[0] && dataMovies[0].fullTitle,
        imDbRating: dataMovies && dataMovies[0] && dataMovies[0].imDbRating,
        imDbRatingCount:
          dataMovies && dataMovies[0] && dataMovies[0].imDbRatingCount,
        image: dataMovies && dataMovies[0] && dataMovies[0].image,
        rankUpDown: dataMovies && dataMovies[0] && dataMovies[0].rankUpDown,
        year: dataMovies && dataMovies[0] && dataMovies[0].year,
        userId: responseData[key].userId,
      });
    }
  }

  dispatch(setMoviesFavorites(loadedMovies));
};

export const addFavorites = (user, movieId) => async (dispatch) => {
  const response = await fetch(
    "https://mentos-app-default-rtdb.firebaseio.com/favorites.json",
    {
      method: "POST",
      body: JSON.stringify({ userId: user, movieId: movieId }),
    }
  );
  if (response.ok) {
    dispatch(fetchDataMoviesFavorites());
  }
};

export const removeFavorites = (id) => async (dispatch) => {
  const user = store.getState().auth && store.getState().auth.user.uid;
  const favorites = store.getState().favoritesList.favorites;

  const response = await fetch(
    `https://mentos-app-default-rtdb.firebaseio.com/favorites/${
      favorites.filter((data) => data.id === id && user && data.userId)[0].key
    }.json`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    dispatch(fetchDataMoviesFavorites());
  }
};

export const fetchMovieLikes = () => async (dispatch) => {
  const response = await fetch(
    "https://mentos-app-default-rtdb.firebaseio.com/likes.json"
  );
  const responseData = await response.json();
  const loadedMovies = responseData;

  dispatch(setLikedMovie(loadedMovies));
};

export const addLike = (movieId) => async (dispatch) => {
  const userId = store.getState().auth.user && store.getState().auth.user.uid;

  const response = await fetch(
    "https://mentos-app-default-rtdb.firebaseio.com/likes.json",
    {
      method: "PATCH",
      body: JSON.stringify({
        [`${movieId}_${userId}`]: {
          movieId: movieId,
          userId: userId,
        },
      }),
    }
  );
  if (response.ok) {
    dispatch(fetchMovieLikes());
  }
};

export const removeLike = (movieId) => async (dispatch) => {
  const userId = store.getState().auth.user && store.getState().auth.user.uid;

  const response = await fetch(
    `https://mentos-app-default-rtdb.firebaseio.com/likes/${movieId}_${userId}.json`,
    {
      method: "DELETE",
    }
  ).catch((errorMessage) => {
    console.log(errorMessage);
  });
  if (response.ok) {
    dispatch(fetchMovieLikes());
  }
};
