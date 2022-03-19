import {LOGIN, LOGOUT} from './actionTypes';


export const login = (uid, email, username, token) => ({
  type: LOGIN,
  payload: {
    uid,
    email,
    username,
    token
  }
});


export const logout = () => ({
  type: LOGOUT
})

