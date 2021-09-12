import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import validator from "validator";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const initialForm = {
    email: "pororo@gmail.com",
    password: "123456",
  };

  const [formValues, handleInputChange] = useForm(initialForm);
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isFormValid = () => {
    let msgErrorForm = "";
    let valid = true;

    if (!validator.isEmail(email) && valid) {
      msgErrorForm = "mail is not valid";
      valid = false;
    }

    if (password.trim().length === 0 && valid) {
      msgErrorForm = "Password is required";
      valid = false;
    }

    if (valid) {
      dispatch(removeError());
    } else {
      dispatch(setError(msgErrorForm));
    }

    return valid;
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleLogin}
      >
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
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
