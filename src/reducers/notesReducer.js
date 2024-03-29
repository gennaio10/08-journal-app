import { types } from "../types/types";

const initalState = {
  notes: [],
  active: null,
};
export const notesReducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesDeleted:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.noteLogoutCleaning:
      return initalState;

    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };

    default:
      return state;
  }
};
