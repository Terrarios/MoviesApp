import { useDispatch, connect, useSelector } from "react-redux";
import classes from "./Search.module.css";
import { setFilterMovies } from "../store/action";

const Search = ({ searchInput }) => {
  const dispatch = useDispatch();
  const isSearching =
    useSelector((state) => state.moviesList.searchInput) !== "";

  const searchInputHandler = (event) => {
    const userInput = event.target.value.toLowerCase().trim();
    dispatch(setFilterMovies(userInput));
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  const clearSearch = () => {
    dispatch(setFilterMovies(""));
  };

  return (
    <>
      <form action="/" method="get" onSubmit={submitFormHandler}>
        <label htmlFor="search-bar" />
        <input
          type="text"
          id="search-bar"
          placeholder="  type movie's name"
          name="s"
          value={searchInput}
          onChange={searchInputHandler}
          className={classes.input}
        />
        {isSearching && (
          <button onClick={clearSearch} className={classes.button}>
            x
          </button>
        )}
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchInput: state.moviesList.searchInput,
    sortedBy: state.moviesList.sortedBy,
    isAscending: state.moviesList.isAscending,
  };
};

export default connect(mapStateToProps)(Search);
