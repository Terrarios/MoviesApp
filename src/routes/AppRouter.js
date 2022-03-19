import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthRouters from './AuthRouter';
import {MoviesRouters} from './MoviesRouters';
import {useDispatch} from 'react-redux';
import {login} from '../store/auth.action';
import AuthVerify from "../common/AuthVerify";

export const AppRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    if( user?.uid ) {
        dispatch( login(user.uid, user.email, user.displayName, user.accessToken))
    }
  }, [dispatch]);


  return (
      <Router >
        <div>
          <Switch>
            <Route path="/auth" component={AuthRouters}/>
            <Route path="/" component={MoviesRouters}/>
            
          </Switch>

          <AuthVerify />
        </div>
      </Router >
  )
}
