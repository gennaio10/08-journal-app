import "@testing-library/jest-dom";
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { firebase } from "../../firebase/firebase-config";
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "@testing-library/react";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter />", () => {
  test("debe de llamar el login si estoy autenticado", async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("pororo@gmail.com", "123456");
      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith("R4HS5q2zGrUpFWnix25PAhIhsQo1", null);
  });
});
