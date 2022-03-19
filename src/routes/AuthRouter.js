import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {LoginGoogle} from '../components/LoginGoogle';
import {Register} from '../components/Register';


const AuthRouters = () => {



  return (

      <div className="auth__main">
        <div className="auth__box-container">
          <Switch>
            <Route exact path="/auth/login" component={LoginGoogle}/>
            <Route exact path="/auth/register" component={Register}/>

            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </div>
  );
}


export default AuthRouters;
