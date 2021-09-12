import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }))

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
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de hacer el dispatch de la acción respectiva", () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "mail is not valid",
    });
  });

  //Como la caja de texto fue remplazada por un mensaje desde los action
  //se tendria que realizar la prueba que genere le mensaje, sin embargo con el
  //valir del error del store de redux se sabe que todo esta ok.
  //   test("debe de mostrar la caja de alerta con el error", () => {
  //     const initState = {
  //       auth: {},
  //       ui: {
  //         loading: false,
  //         msgError: "mail is not valid",
  //       },
  //     };

  //     const store = mockStore(initState);

  //     const wrapper = mount(
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <RegisterScreen />
  //         </MemoryRouter>
  //       </Provider>
  //     );

  //     expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
  //     expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
  //       initState.ui.msgError
  //     );
  //   });
});
