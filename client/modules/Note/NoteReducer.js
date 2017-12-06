
import { ADD_NOTE, ADD_NOTES, DELETE_NOTE, UPVOTE, DOWNVOTE } from './NoteActions';

const initialState = { notes: [] };

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE :
      return {
        notes: [action.note, ...state.notes],
      };

    case ADD_NOTES :
      const notes  = action.payload.map(note => {
        note._source.id = parseInt(note._id);
        return note._source;
      })
      return {
        notes,
      };

    case DELETE_NOTE :
      return {
        notes: state.notes.filter(note => note.id !== action.id),
      };

    case UPVOTE:
      return {
        notes: state.notes.map((note) => {
          console.log("From inside note reducer UPVOTE - " + action.payload)
          const { noteId, username } = action.payload
          if(note.id === noteId) {
            // Use below commented code to implement click toggle (upvote when clicked first time, downvote when clicked again)
            // let upvotes = note.
            // if note.meta.upvotes.contains(username) {

            // }
            return {
              ...note,
              meta: {
                ...note.meta,
                upvotes: [...note.meta.upvotes, username]
              }
            }
          }
          return note;
        })
      }

    case DOWNVOTE:
      return {
        notes: state.notes.map((note) => {
          console.log("From inside note reducer DOWNVOTE - " + action.payload)
          const { noteId, username } = action.payload
          if(note.id === noteId) {
            return {
              ...note,
              meta: {
                ...note.meta,
                downvotes: [...note.meta.downvotes, username]
              }
            }
          }
          return note;
        })
      }

    default:
      return state;
  }
};

/* Selectors */

// Get all notes
export const getNotes = state => state.notebook.notes;

// Get note by id
export const getNote = (state, id) => state.notebook.notes.filter(note => note.id === id)[0];

// Export Reducer
export default NoteReducer;
