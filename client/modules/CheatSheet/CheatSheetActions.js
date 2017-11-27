import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_CHEATSHEET = 'ADD_CHEATSHEET';
export const ADD_CHEATSHEETS = 'ADD_CHEATSHEETS';
export const DELETE_CHEATSHEET = 'DELETE_CHEATSHEET';

// Export Actions
export function addCheatsheet(cheatsheet) {
  return {
    type: ADD_CHEATSHEET,
    cheatsheet,
  };
}

export function addCheatsheetRequest(cheatsheet) {
  return (dispatch) => {
    return callApi('cheatsheets', 'post', {
      cheatsheet: {
        owner: cheatsheet.owner,
        title: cheatsheet.title,
        content: cheatsheet.content,
      },
    }).then(res => dispatch(addCheatsheet(res.cheatsheet)));
  };
}

export function addCheatsheets(cheatsheets) {
  return {
    type: ADD_CHEATSHEETS,
    cheatsheets,
  };
}

export function fetchCheatsheets() {
  return (dispatch) => {
    // return callApi('cheatsheets').then(res => {
    //   dispatch(addCheatsheets(res.cheatsheets));
    // });
    dispatch(addCheatsheets([]));
  };
}

export function fetchCheatsheet(cuid) {
  return (dispatch) => {
    return callApi(`cheatsheets/${cuid}`).then(res => dispatch(addCheatsheet(res.cheatsheet)));
  };
}

export function deleteCheatsheet(cuid) {
  return {
    type: DELETE_CHEATSHEET,
    cuid,
  };
}

export function deleteCheatsheetRequest(cuid) {
  return (dispatch) => {
    return callApi(`cheatsheets/${cuid}`, 'delete').then(() => dispatch(deleteCheatsheet(cuid)));
  };
}
