import "@testing-library/jest-dom";
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la acción de startGoogleLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("Deberia de disparar el startLogin con los respectivos argumentos", () => {
    // 1. Inicializar el correo y contraseña
    const email = "pororo@gmail.com";
    const password = "123456";

    // 3. Simular el llenado del campo de email
    wrapper.find('input[name="email"]').simulate("change", {
      target: {
        name: "email", // Nota asi debe de llamarse en tu formulario
        value: email, // El valor lo tomo de la variable
      },
    });

    // 4. Simular el llenado del campo del password
    wrapper.find('input[name="password"]').simulate("change", {
      target: {
        name: "password", // Nota asi debe de llamarse en tu formulario
        value: password, // El valor lo tomo de la variable
      },
    });

    // 4. Buscar el botón de Google y simular el evento click
    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    // 5. Probar que la acción halle sido llamada
    expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password);
  });
});
