import { ADD_CHEATSHEET, ADD_CHEATSHEETS, DELETE_CHEATSHEET } from './CheatSheetActions';
const dummyCheatSheets = [{
  id: 1,
  title: 'Java Language',
  content: "Oracle Corporation is the current owner of the official implementation of the Java SE platform, following their acquisition of Sun Microsystems on January 27, 2010. This implementation is based on the original implementation of Java by Sun. The Oracle implementation is available for Microsoft Windows (still works for XP, while only later versions currently officially supported), macOS, Linux, and Solaris. Because Java lacks any formal standardization recognized by Ecma International, ISO/IEC, ANSI, or other third-party standards organization, the Oracle implementation is the de facto standard. The Oracle implementation is packaged into two different distributions The Java Runtime Environment (JRE) which contains the parts of the Java SE platform required to run Java programs and is intended for end users, and the Java Development Kit (JDK), which is intended for software developers and includes development tools such as the Java compiler, Javadoc, Jar, and a debugger." ,
  owner: 'user14@gmail.com',
  isPrivate: true,
}, {
  id: 2,
  title: 'SQL',
  content: 'The SQL language is subdivided into several language elements, including, Clauses, which are constituent components of statements and queries. (In some cases, these are optional.) Expressions, which can produce either scalar values, or tables consisting of columns and rows of data',
  owner: 'user14@gmail.com',
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
