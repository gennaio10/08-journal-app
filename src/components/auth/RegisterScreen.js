import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const initialForm = {
    name: "Laura Herrera",
    email: "pororo@gmail.com",
    password: "123456",
    password2: "123456",
  };

  const [formValues, handleInputChange] = useForm(initialForm);
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    let msgErrorForm = "";
    let valid = true;

    if (validator.isEmpty(name) && valid) {
      msgErrorForm = "Name is required";
      valid = false;
    }

    if (!validator.isEmail(email) && valid) {
      msgErrorForm = "mail is not valid";
      valid = false;
    }

    if (password.trim().length === 0 && valid) {
      msgErrorForm = "Password is required";
      valid = false;
    }

    if (password !== password2 && valid) {
      msgErrorForm = "passwords must be the same";
      valid = false;
    }

    if (!valid) {
      dispatch(setError(msgErrorForm));
    } else {
      dispatch(removeError());
    }

    return valid;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleRegister}
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

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
