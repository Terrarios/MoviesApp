import { Link } from "react-router-dom";
import classes from "./CardMovies.module.css";
import { useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { store } from "../store/index";

export const CardMovies = ({
  movies,
  favorite,
  favoritesList,
  removeItem,
  like,
}) => {
  const { user } = useSelector((state) => state.auth);
  const likesList = useSelector((state) => state.likesList.data);
  const isLiked = (movieId) => {
    const userId = store.getState().auth.user && store.getState().auth.user.uid;
    return likesList && likesList[`${movieId}_${userId}`];
  };
  const totalLikes = (movieId) => {
    return Object.keys(likesList).filter(
      (id) => likesList[id].movieId === movieId
    ).length;
  };

  return (
    movies &&
    movies.map((movie) => {
      return (
        <div key={movie.id} className={classes.card}>
          <div>
            <img
              src={movie.image}
              height={300}
              width={"100%"}
              alt="images"
              className={classes.img}
            />
            <ul className={classes.head}>
              <li style={{ display: "flex" }}>
                <button
                  className={classes.like}
                  style={{ "lineHeight": "0" }}
                  onClick={() => like(movie.id, movie.user)}
                  disabled={user !== undefined ? false : true}
                >
                  <ThumbUpIcon
                    style={{ fill: isLiked(movie.id) ? "green" : "" }}
                  />
                </button>
                <p style={{ "fontSize": "25px", 'marginTop': '15px' }}>{totalLikes(movie.id)}</p>
              </li>
              <li className={classes.like}>
                <p className={classes.year}>Rank: {movie.rank}</p>
                <p className={classes.year}>Año {movie.year}</p>
              </li>
            </ul>
          </div>

          <div className={`${classes.p} ${classes.title}`}>{movie.title}</div>
          <div className={classes.p}>Crew: {movie.crew}</div>
          <Link className={classes.details} to={`/movie/${movie.id}`}>
            <button className={classes.button}>Details </button>
          </Link>
          <div className={favoritesList ? classes.favorites : classes.flag}>
            {user !== undefined && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "30px",
                  color: favoritesList && "white",
                }}
                onClick={() =>
                  favoritesList
                    ? removeItem(movie.id, "hola")
                    : favorite(movies.id)
                }
              >
                {favoritesList ? "🤍" : "♡"}
              </div>
            )}
          </div>
        </div>
      );
    })
  );
};
