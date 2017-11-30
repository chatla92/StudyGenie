import callApi from '../../util/apiCaller';
import { createAction } from 'redux-actions';

// Export Constants
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTES = 'ADD_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';

// Export Actions
export function addNote(note) {
  return {
    type: ADD_NOTE,
    note,
  };
}

export function addNoteRequest(note) {
  return (dispatch) => {
    return callApi('notes', 'post', {
      note: {
        owner: note.owner,
        title: note.title,
        content: note.content,
      },
    }).then(res => dispatch(addNote(res.note)));
  };
}

export const addNotes = createAction(
  ADD_NOTES,
  notes => notes,
);

// Export Actions
export function fetchNotes({pageNumber, contentQuery, tagQuery}) {
  let query = {}
  if (contentQuery) {
    query.contentQuery = contentQuery
  } else if(tagQuery) {
    query.tagQuery = tagQuery
  }
  return (dispatch) => {
    return callApi(`note/getNotes/${pageNumber}`, 'post', query).then(response => {
      dispatch(addNotes(response.result));
    }, err => {
      dispatch(getNotesFailure(err));
    });
  };

}

export function fetchNote(cuid) {
  return (dispatch) => {
    return callApi(`notes/${cuid}`).then(res => dispatch(addNote(res.result)));
  };
}

export function deleteNote(cuid) {
  return {
    type: DELETE_NOTE,
    cuid,
  };
}

export function deleteNoteRequest(cuid) {
  return (dispatch) => {
    return callApi(`notes/${cuid}`, 'delete').then(() => dispatch(deleteNote(cuid)));
  };
}
