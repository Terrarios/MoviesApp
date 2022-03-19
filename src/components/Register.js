import React from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from '../hooks/useForm';
import {Link} from 'react-router-dom';
import {registerWithEmailPassword} from '../store/services';


export const Register = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerWithEmailPassword(email, password, name));
  }

  return (
      <>
            <h3 className="auth__title">Register</h3>
            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

              <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="auth__input"
                  autoComplete="off"
                  value={name}
                  onChange={handleInputChange}
              />

              <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="auth__input"
                  autoComplete="off"
                  value={email}
                  onChange={handleInputChange}
              />

              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="auth__input"
                  value={password}
                  onChange={handleInputChange}
              />

              <button
                  type="submit"
                  className="btn btn-primary btn-block me-2"
              >
                Register
              </button>

              <Link
                  to='/auth/login'
                  className="link"
              >
                Already registered?
              </Link>

            </form>
      </>
  )
}
