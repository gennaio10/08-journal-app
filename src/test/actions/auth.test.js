import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { types } from "../../types/types";
import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword,
} from "../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe("Pruebas con las acciones de Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login y logout deben de crear la acción respectiva", () => {
    const uid = "ABC123";
    const displayName = "Julian";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("debe de realizar el startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.noteLogoutCleaning,
    });
  });

  test("debe de iniciar el startLoginEmailPassword", async () => {
    await store.dispatch(startLoginEmailPassword("pororo@gmail.com", "123456"));

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "R4HS5q2zGrUpFWnix25PAhIhsQo1",
        displayName: null,
      },
    });
  });
});
