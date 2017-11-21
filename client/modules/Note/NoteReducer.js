
import { ADD_NOTE, ADD_NOTES, DELETE_NOTE } from './NoteActions';
const dummyNotes = [{
  title: 'String',
  content: 'LongString',
  owner: [1],
  isPrivate: true,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}, {
  title: 'Second String',
  content: 'Second Long String',
  owner: [2],
  isPrivate: true,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}];

const initialState = { notes: dummyNotes };

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE :
      return {
        notes: [action.note, ...state.notes],
      };

    case ADD_NOTES :
      return {
        notes: [...action.notes, ...state.notes],
      };

    case DELETE_NOTE :
      return {
        notes: state.notes.filter(note => note.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all notes
export const getNotes = state => state.notebook.notes;

// Get note by cuid
export const getNote = (state, cuid) => state.notebook.notes.filter(note => note.cuid === cuid)[0];

// Export Reducer
export default NoteReducer;
