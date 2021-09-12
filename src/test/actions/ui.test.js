import {
  setIError,
  removeError,
  startLoading,
  finishLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("Pruebas en ui-actions", () => {
  test("todas las acciones deben de funcionar", () => {
    const messageError = "HELP!!!!";
    const action = setIError(messageError);

    expect(action).toEqual({
      type: types.uiSetError,
      payload: messageError,
    });

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
