
import { ADD_NOTE, ADD_NOTES, DELETE_NOTE } from './NoteActions';
const dummyNotes = [{
  title: 'String',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Tinu Tomson',
  isPrivate: true,
  isEditable: true,
  LastModified: 1481544700,
  cuid: 12345,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}, {
  title: 'Second String',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Sravan Samudra',
  cuid: 12346,
  isPrivate: true,
  isEditable: true,
  LastModified: 1481544732,
  meta: {
    tags: [100, 101, 102],
    fav: [1001, 1002, 1003, 1004],
    upvote: [1001, 1002, 1003, 1004],
    downvote: [],
  },
}];

const initialState = { notes: [] };

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE :
      return {
        notes: [action.note, ...state.notes],
      };

    case ADD_NOTES :
      const notes  = action.payload.map(note => {
        note._source.upvotes =  Math.floor(Math.random()* 26)
        note._source.downvotes =  Math.floor(Math.random()* 6)
        return note._source;
      })
      return {
        notes,
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
