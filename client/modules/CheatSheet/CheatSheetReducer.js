import { ADD_CHEATSHEET, ADD_CHEATSHEETS, DELETE_CHEATSHEET } from './CheatSheetActions';
const dummyCheatSheets = [{
  id: 1,
  title: 'Cheatsheet 1',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Tinu Tomson',
  isPrivate: true,
}, {
  id: 2,
  title: 'CheatSheet 2',
  content: 'Ipsum vero ab sequi tenetur labore vero amet facilis tempora tempora eos. Neque aliquid cum quam porro sunt sint, ducimus. Sunt neque odit non quia eveniet magnam. Eum facilis blanditiis.',
  owner: 'Sravan Samudra',
}];

const initialState = { cheatsheets: dummyCheatSheets };

const CheatSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHEATSHEET :
      return {
        cheatsheets: [action.cheatsheet, ...state.cheatsheets],
      };

    case ADD_CHEATSHEETS :
      return {
        cheatsheets: [...action.cheatsheets, ...state.cheatsheets],
      };

    case DELETE_CHEATSHEET :
      return {
        cheatsheets: state.cheatsheets.filter(cheatsheet => cheatsheet.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all cheatsheets
export const getCheatSheets = state => state.cheatsheet.cheatsheets;

// Get cheatsheet by cuid
export const getCheatSheet = (state, cuid) => state.cheatsheetbook.cheatsheets.filter(cheatsheet => cheatsheet.cuid === cuid)[0];

// Export Reducer
export default CheatSheetReducer;
