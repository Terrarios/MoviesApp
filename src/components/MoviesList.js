import React, { useEffect, useState } from "react";
import { CardMovies } from "./CardMovies";
import "../App.css";
import Header from "../Header";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  fetchDataMoviesFavorites,
  fetchMoviesList,
  removeFavorites,
  addLike,
  removeLike,
  fetchMovieLikes,
} from "../store/services";
import Pagination from "./Pagination";
import { store } from "../store/index";

const MoviesList = ({
  sortedBy,
  isAscending,
  movies,
  searchInput,
  history,
  favorites,
}) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20);
  const { user } = useSelector((state) => state.auth);

  const indexOfLastMovies = currentPage * moviesPerPage;
  const indexOfFirstMovies = indexOfLastMovies - moviesPerPage;

  const currentMovies = movies
    .filter((movie) => {
      return movie.title.includes(searchInput);
    })
    .slice(indexOfFirstMovies, indexOfLastMovies);

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scroll(0, 0);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scroll(0, 0);
  };

  useEffect(() => {
    dispatch(fetchMoviesList("MostPopularMovies"));
    dispatch(fetchDataMoviesFavorites());
    dispatch(fetchMovieLikes());
  }, [dispatch]);

  const operationRank = (movies) => {
    let sortFunc = (a, b) => b.rank - a.rank;
    if (isAscending) {
      sortFunc = (a, b) => a.rank - b.rank;
    }
    return movies.sort(sortFunc);
  };

  const operationType = (movies) => {
    let sortFunc = (a, b) =>
      a[sortedBy] < b[sortedBy] ? 1 : b[sortedBy] < a[sortedBy] ? -1 : 0;
    if (isAscending) {
      sortFunc = (a, b) =>
        a[sortedBy] > b[sortedBy] ? 1 : b[sortedBy] > a[sortedBy] ? -1 : 0;
    }
    return movies.sort(sortFunc);
  };

  if (sortedBy === "rank") {
    operationRank(movies);
  } else {
    operationType(movies);
  }

  const addOrRemoveLikeHandler = (movieId) => {
    const userId = store.getState().auth.user && store.getState().auth.user.uid;
    const likeList =
      store.getState().likesList && store.getState().likesList.data;
    if (!likeList || !likeList[`${movieId}_${userId}`]) {
      return addLike(movieId);
    } else {
      return removeLike(movieId);
    }
  };

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <Header />
      <div className="box">
        <CardMovies
          movies={currentMovies && currentMovies}
          favorite={(e) => dispatch(addFavorites(user.uid, e))}
          removeItem={(e) => dispatch(removeFavorites(e))}
          favoritesList={false}
          like={(movieId) => dispatch(addOrRemoveLikeHandler(movieId))}
        />
      </div>

      <Pagination
        MoviesPerPage={moviesPerPage}
        totalMovies={movies && movies.length}
        paginate={(num) => paginate(num)}
        nextPage={nextPage}
        prevPage={prevPage}
        currentMovies={currentMovies && currentMovies.length}
        currentPage={currentPage}
      />

      <div
        className="box"
        style={{
          border: "4px solid #343434",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "0",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <div>Your favorites</div>
          <div onClick={() => history.push("/movie/favorites")}>»</div>
        </div>
        <div className="box">
          <CardMovies
            //key = favorite.key
            movies={favorites !== undefined && favorites}
            favorite={(e) => dispatch(addFavorites(user.uid, e.id))}
            removeItem={(e) => dispatch(removeFavorites(e))}
            favoritesList={true}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sortedBy: state.moviesList.sortedBy,
    isAscending: state.moviesList.isAscending,
    movies: state.moviesList.moviesList || [],
    searchInput: state.moviesList.searchInput,
    favorites: state.favoritesList.favorites,
    likes: state.likesList.movieLikes,
  };
};

export default connect(mapStateToProps)(MoviesList);
