import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { MovieDetails } from "../components/MovieDetails";
import { LogIn } from "../components/LogIn";
import MoviesList from "../components/MoviesList";
import FavoritesPage from "../components/FavoritesPage";
import { LoginGoogle } from '../components/LoginGoogle';
import {Register} from '../components/Register';


export const MoviesRouters = () => {
  return (
    <Switch>
      <Route exact path="/movie/favorites" component={FavoritesPage} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/LogIn" component={LogIn} />
      <Route exact path="/auth/login" component={LoginGoogle} />
      <Route exact path="/auth/register" component={Register} />
      <Route to="/auth/login" />
      <Route exact path="/" component={MoviesList} />
    </Switch>
  );
};
