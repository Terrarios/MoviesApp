import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { fetchMoviesDetails, fetchMoviesTrailer } from "../store/services";
import { useDispatch, useSelector } from "react-redux";
import { MovieProperties } from "../UI/MovieDetails/MovieProperties";
import movieGif from "../MovieGif.gif";
import { ModalTrailer } from "./ModalTrailer";

export const 
MovieDetails = ({ history }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const idMovie = params.id;
  const movie = useSelector((state) => state.movieDetails.data);
  const trailer = useSelector((state) => state.movieTrailer.data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchMoviesDetails(idMovie));
    dispatch(fetchMoviesTrailer(idMovie));
  }, [dispatch, idMovie]);

  if (movie !== undefined && movie && movie.title === null) {
    return <Redirect to="/" />;
  }

  const handleReturn = () => {
    history.goBack();
  };

  const {
    title,
    image,
    year,
    directors,
    writers,
    stars,
    genres,
    countries,
    languages,
    plot,
  } = movie !== undefined && movie;

  return (
    <>
      {movie && movie.id && movie.id === idMovie && image !== undefined ? (
        <div className="container pt-5">
          <h1 className="mb-3">Details Movie</h1>

          <div className="row mt-2">
            <div className="col-4">
              {image && (
                <img
                  src={image}
                  alt={plot}
                  className="img-thumbnail animate__animated animate__fadeInLeft"
                />
              )}
              {trailer && trailer.videoDescription !== null && (
                <button className="Button-return-trailer" onClick={handleShow}>
                  Trailer
                </button>
              )}
              <button className="Button-return-trailer" onClick={handleReturn}>
                Return
              </button>
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
              <h3 style={{ color: "#2257c2" }}> {title} </h3>
              <ul className="list-group list-group-flush">
                <MovieProperties data={year}>Year:</MovieProperties>
                <MovieProperties data={genres}>Genres:</MovieProperties>
                <MovieProperties data={countries}>Countries:</MovieProperties>
                <MovieProperties data={languages}>Languages:</MovieProperties>
                <MovieProperties data={directors}>Directors:</MovieProperties>
                <MovieProperties data={writers}>Writers:</MovieProperties>
              </ul>
              <ul></ul>

              <h4 className="mt-3" style={{ color: "#2257c2" }}>
                {" "}
                Stars{" "}
              </h4>
              <ul className="list-group list-group-flush">
                <MovieProperties data={stars}></MovieProperties>
              </ul>

              <ModalTrailer
                trailer={trailer}
                handleClose={() => handleClose()}
                show={show}
              />
            </div>
          </div>
        </div>
      ) : (
        <img src={movieGif} alt="MovieGif" width={200} height={200} />
      )}
    </>
  );
};
