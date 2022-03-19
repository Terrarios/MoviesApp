import React from "react";

export const MovieProperties = (props) => {
  return (
    <li className="list-group-item" style={{ backgroundColor: "#282c34" }}>
      <b> {props.children} </b> {props.data}
    </li>
  );
};
