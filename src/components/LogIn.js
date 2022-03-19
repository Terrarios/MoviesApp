import { useState } from "react";
// import { setUser } from "../store/action";
import { useDispatch } from "react-redux";

export const LogIn = ({ history }) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  //   const [enteredPassword, setEnteredPassword] = useState("");

  const dispatch = useDispatch();

  const idInputChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  //   const passwordInputChangeHandler = (event) => {
  //     setEnteredPassword(event.target.value);
  //   };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // dispatch(setUser(enteredUsername));
  };

  const handleReturn = () => {
    history.goBack();
  };

  return (
    <div>
      <div>
        <header>
          <h1>Mento's Movies</h1> <button onClick={handleReturn}>Home</button>
        </header>
      </div>
      <div>
        <form onSubmit={formSubmissionHandler}>
          <label htmlFor="userId">Username:</label>
          <br />
          <input type="text" id="userId" onChange={idInputChangeHandler} />
          <br />
          {/* <label htmlFor="userPassword">Password:</label>
          <br />
          <input
            type="password"
            id="userPassword"
            onChange={passwordInputChangeHandler}
          />
          <br /> */}
          <div>
            <button type="submit" onClick={handleReturn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
