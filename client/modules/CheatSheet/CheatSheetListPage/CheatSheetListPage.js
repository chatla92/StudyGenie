import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import CheatSheetList from '../components/CheatSheetList';

// Import Actions
import { addCheatSheetRequest, fetchCheatsheets, deleteCheatSheetRequest } from '../CheatSheetActions';

// Import Selectors
import { getCheatSheets } from '../CheatSheetReducer';

class CheatSheetListPage extends Component {
  state = {
    isComposerOpen: false,
  }
  componentDidMount() {
    this.props.dispatch(fetchCheatsheets());
  }

  handleDeleteCheatSheet = cheatsheet => {
    if (confirm('Do you want to delete this cheatsheet')) { // eslint-disable-line
      this.props.dispatch(deleteCheatSheetRequest(cheatsheet));
    }
  };

  handleAddCheatSheet = (owner, title, content) => {
    this.props.dispatch(addCheatSheetRequest({ owner, title, content }));
  };

  requestComposer = (shouldComposerOpen) => {
    this.setState({
      isComposerOpen: shouldComposerOpen,
    });
  };

  render() {
    return (
      <div>
        <CheatSheetList
          requestComposer={this.requestComposer}
          handleDeleteCheatSheet={this.n}
          cheatsheets={this.props.cheatsheets}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    cheatsheets: getCheatSheets(state),
  };
}

CheatSheetListPage.propTypes = {
  cheatsheets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

CheatSheetListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CheatSheetListPage);
