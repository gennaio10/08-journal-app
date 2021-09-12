import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    note.url = fileUrl;

    dispatch(startSaveNote(note));

    Swal.close();
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const noteToFirestore = { ...note };
    if (!note.url) {
      delete noteToFirestore.url;
    }
    delete noteToFirestore.id;

    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      dispatch(refreshNote(note.id, noteToFirestore));
      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: `Nota actualizada: ${noteToFirestore.title}`,
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
        toast: true,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "titulo",
      body: "mensaje",
      date: new Date().getTime(),
    };

    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
        toast: true,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };
};

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id: id,
    ...note,
  },
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    try {
      await db.doc(`${uid}/journal/notes/${id}`).delete();
      dispatch(deleteNote(id));
      Swal.fire({
        icon: "success",
        title: "Borrado",
        text: "Nota borrada",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
        toast: true,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDeleted,
  payload: id,
});

export const noteLogout = () => {
  return {
    type: types.noteLogoutCleaning,
  };
};
