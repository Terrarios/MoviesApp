import React from "react";
import { withRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {startLogout} from '../store/services';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {

  const dispatch = useDispatch();

  props.history.listen(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(startLogout());
      }
    }
  });
  return <div/>;
};

export default withRouter(AuthVerify);
