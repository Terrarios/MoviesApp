import { connect, useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { setSortMoviesBy } from "./store/action";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import { startLogout } from "./store/services";
import Search from "./UI/Search";

const Header = ({ sortedBy, isAscending, isLoggedIn }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <header className={classes.header}>
      <h1 style={{ padding: "20px" }}>Mentos' Movies</h1>
      <div>
        <div className={classes.div}>
          <div>
            <Search />
          </div>
        </div>
        <div className={classes.div}>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(setSortMoviesBy("title", !isAscending));
            }}
          >
            Title {sortedBy !== "title" ? null : isAscending ? "↑" : "↓"}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(setSortMoviesBy("year", !isAscending));
            }}
          >
            Year {sortedBy !== "year" ? null : isAscending ? "↑" : "↓"}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(setSortMoviesBy("rank", !isAscending));
            }}
          >
            Rank {sortedBy !== "rank" ? null : isAscending ? "↑" : "↓"}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(setSortMoviesBy("likes", !isAscending));
            }}
          >
            Likes {sortedBy !== "likes" ? null : isAscending ? "↑" : "↓"}
          </Button>
        </div>
      </div>
      {isLoggedIn && (
        <div>
          <p> {user.username} </p>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <Link to={"/auth/login"}>
            <Button className={classes.button}>Log In</Button>
          </Link>
        </div>
      )}
      {isLoggedIn === undefined ||
        (isLoggedIn && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button className={classes.button} onClick={handleLogout}>
              log Out
            </Button>
          </div>
        ))}
      {/* <Button className={classes.button} onClick={getUser}>Check if Log in</Button> */}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    sortedBy: state.moviesList.sortedBy,
    isAscending: state.moviesList.isAscending,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Header);
