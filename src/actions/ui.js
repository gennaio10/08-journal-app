import { types } from "../types/types";
import Swal from "sweetalert2";

export const setIError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const setError = (err) => {
  return (dispatch) => {
    dispatch(setIError(err));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err,
      toast: true,
      timer: 5000,
      timerProgressBar: true,
    });
  };
};

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
