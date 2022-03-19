import {Link} from 'react-router-dom'
import {useForm} from '../hooks/useForm';
import {useDispatch} from 'react-redux';
import {loginWithEmail, loginWithGoogle} from '../store/services';
import './auth.css';


export const LoginGoogle = ({history}) => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: 'kalita@gmail.com',
    password: 'Ab12345.'
  })

  const {email, password} = formValues;

  const handleEmailLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmail(email, password));
    history.replace('/');
  }

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
    history.replace('/');
  }

  return (
      
      <div className="auth__main">
        <div className="auth__box-container">
        <h3 className="auth__title">Login</h3>

        <form onSubmit={handleEmailLogin}>

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
              className="btn btn-primary w-100"
          >
            Login
          </button>


          <div className="auth__social-networks">
            <p>Login with social networks</p>

            <div
                className="google-btn"
                onClick={handleGoogleLogin}
            >
              <div className="google-icon-wrapper">
                <img className="google-icon"
                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                     alt="google button"/>
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          </div>

          <Link
              to="register"
              className="link"
          >
            Create new account
          </Link>

        </form>
        </div>
      </div>
      
  )
}
