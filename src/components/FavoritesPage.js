import React from "react";
import "../App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { CardMovies } from "./CardMovies";
import { addFavorites, removeFavorites } from "../store/services";

const FavoritesPage = ({ favorites }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div>Your favorite</div>
      <div className="box">
        <CardMovies
          movies={favorites && favorites}
          favorite={(e) => dispatch(addFavorites(user.uid, e))}
          removeItem={(e) => dispatch(removeFavorites(e))}
          favoritesList={true}
        />
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
  };
};

export default connect(mapStateToProps)(FavoritesPage);
