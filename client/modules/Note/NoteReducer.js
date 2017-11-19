
import { ADD_NOTE, ADD_NOTES, DELETE_NOTE } from './NoteActions';

// Initial State
const initialState = { data: [] };

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE :
      return {
        data: [action.note, ...state.data],
      };

    case ADD_NOTES :
      return {
        data: action.notes,
      };

    case DELETE_NOTE :
      return {
        data: state.data.filter(note => note.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all notes
export const getNotes = state => state.notes.data;

// Get note by cuid
export const getNote = (state, cuid) => state.notes.data.filter(note => note.cuid === cuid)[0];

// Export Reducer
export default NoteReducer;
