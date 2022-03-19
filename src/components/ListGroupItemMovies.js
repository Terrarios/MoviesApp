import React from "react";
import "../App.css";

export const ListGroupItemMovies = ({ titleItem, propertyItem }) => {
  return (
    <li className="list-group-item" style={{ backgroundColor: "#282c34" }}>
      <b> {titleItem} </b> {propertyItem}{" "}
    </li>

  );
};
