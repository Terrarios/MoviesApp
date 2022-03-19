import React from "react";
import "./Pagination.css";

const Pagination = ({
  MoviesPerPage,
  totalMovies,
  paginate,
  nextPage,
  prevPage,
  currentMovies,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.round(totalMovies / MoviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="example">
      {MoviesPerPage <= currentMovies && (
        <nav aria-label="Page navigation example">
          <ul
            className="pagination justify-content-center"
            style={{ marginBottom: 0 }}
          >
            <li className="page-item ">
              <button
                disabled={currentPage === 1 ? true : false}
                onClick={() => prevPage()}
                className="page-link"
                // href="#"
                tabIndex="-1"
              >
                <span aria-hidden="true">←</span>
              </button>
            </li>
            {pageNumbers.map((num) => {
              return (
                <li className="page-item" key={num}>
                  <button
                    onClick={() => paginate(num)}
                    // href="#"
                    className="page-link"
                    style={{
                      backgroundColor: currentPage === num && "#5ca5e9",
                      border: currentPage === num && "2px solid #2257c2",
                    }}
                  >
                    {num}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <button
                disabled={
                  currentPage === Math.round(totalMovies / MoviesPerPage)
                    ? true
                    : false
                }
                onClick={() => nextPage()}
                className="page-link"
                href="#"
              >
                <span aria-hidden="true">→</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
