/**
 * @jest-environment node
 */

import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { types } from "../../types/types";
import { db } from "../../firebase/firebase-config";

import { fileUpload } from "../../helpers/fileUpload";
import * as fs from "fs";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "iRnbpSMleLSNOkfc5LdO",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

describe("Pruebas con las acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe de crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    const titleDefault = "titulo";
    const bodyDefault = "mensaje";

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: titleDefault,
        body: bodyDefault,
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: titleDefault,
        body: bodyDefault,
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("startLoadingNotes debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("/TESTING"));
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote debe de actualizar la nota", async () => {
    const note = {
      id: "iRnbpSMleLSNOkfc5LdO",
      title: "titulo uno",
      body: "mensaje uno",
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test("startUploading debe de actualizar la url del entry", async () => {
    fileUpload.mockReturnValue("https://hola-mundo.com");
    fs.writeFileSync("foto.jpg", "");
    const file = fs.readFileSync("foto.jpg");
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc(`/TESTING/journal/notes/iRnbpSMleLSNOkfc5LdO`)
      .get();
    expect(docRef.data().url).toBe("https://hola-mundo.com");
  });
});
