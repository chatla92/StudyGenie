import callApi from '../../util/apiCaller';
import { createAction } from 'redux-actions';
import localStorage from 'localStorage';

// Export Constants
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTES = 'ADD_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPVOTE = 'UPVOTE';

export const addNote = createAction(
  ADD_NOTE,
  note => note,
);

export function addNoteRequest(title, content, tags) {
  return (dispatch) => {
    return callApi('note/new', 'post', {
      title,
      content,
      tags,
      isPrivate: true,
      owner: {
        username: localStorage.getItem('username'),
        fullname: localStorage.getItem('fullname'),
      }
    }, {title, content, tags}).then(res => dispatch(addNote(res.note)));
  };
}

export function requestNoteUpvote(noteId) {
  const username = localStorage.getItem('username');
  return (dispatch) => {
    return callApi('note/upvote', 'post', {
      noteId
    }).then(res => dispatch(upVote({noteId, username})));
  }
}

export const upVote = createAction(
  UPVOTE,
  obj => obj,
)

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
