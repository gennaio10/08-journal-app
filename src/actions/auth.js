import { types } from "../types/types";
import { googleAuthProvider, firebase } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    //firebase
    //Se agrego el return par apoder realziar las pruebas
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
