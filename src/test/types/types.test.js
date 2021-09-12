import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("Pruebas de types.js)", () => {

  test("debe de tener las acciones correctas", () => {
    expect(types).toEqual({
      login: "[auth] login",
      logout: "[auth] logout",
  
      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",
  
      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",
  
      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdated: "[Notes] Updated note",
      notesFileUrl: "[Notes] Updated image url",
      notesDeleted: "[Notes] Delete note",
      noteLogoutCleaning: "[Notes] Logout Cleaning",
    });
  });
});
