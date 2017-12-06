import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Import Components
import NoteGrid from '../../components/NoteGrid';
import NoteComposer from '../../components/NoteComposer/NoteComposer';
import NoteViewer from '../../components/NoteViewer/NoteViewer';
import { bindActionCreators } from 'redux';

// Import Actions
import { addNoteRequest, fetchNotes, deleteNoteRequest } from '../../NoteActions';
import { signinSuccessful } from '../../../Auth/AuthActions';
// Import Selectors
import { getNotes } from '../../NoteReducer';

class NoteGridPage extends Component {
  state = {
    isComposerOpen: false,
    isViewerOpen: false,
    openedNote: null,
  }

  componentDidMount() {
    if(localStorage.getItem('username')) {
      const username = localStorage.getItem('username');
      const fullname = localStorage.getItem('fullname');
      this.props.signinSuccessful({username, fullname});
    }
    this.props.dispatch(fetchNotes({pageNumber: 1}));
  }

  handleDeleteNote = note => {
    if (confirm('Do you want to delete this note')) { // eslint-disable-line
      this.props.dispatch(deleteNoteRequest(note));
    }
  };

  handleAddNote = (owner, title, content) => {
    this.props.dispatch(addNoteRequest({ owner, title, content }));
  };

  requestComposer = (shouldComposerOpen, note) => {
    this.setState({
      isComposerOpen: shouldComposerOpen,
      openedNote: note,
    });
  };

  requestViewer = (shouldViewerOpen, note) => {
    this.setState({
      isViewerOpen: shouldViewerOpen,
      openedNote: note,
    });
  };

  render() {
    let { notes, username, filter } = this.props;
    if (filter === 'mynotes') {
      notes = notes.filter(note => note.owner.username === username)
    }
    return (
      <div>
        <NoteGrid
          cols={5}
          dispatch={this.props.dispatch}
          requestComposer={this.requestComposer}
          requestViewer ={this.requestViewer}
          handleDeleteNote={this.handleDeleteNote}
          notes={notes}
        />
        <NoteComposer
          dispatch={this.props.dispatch}
          requestComposer={this.requestComposer}
          isComposerOpen={this.state.isComposerOpen}
          openedNote={this.state.openedNote}
        />
        <NoteViewer
          requestViewer={this.requestViewer}
          requestComposer={this.requestComposer}
          isViewerOpen={this.state.isViewerOpen}
          openedNote={this.state.openedNote}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
NoteGridPage.need = [() => { return fetchNotes(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    notes: getNotes(state),
    filter: state.notebook.filter,
    username: state.auth.username,
  };
}

NoteGridPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

NoteGridPage.contextTypes = {
  router: PropTypes.object,
};

function mapDispatchToProp(dispatch) {
  return {
    ...bindActionCreators({
      signinSuccessful,
    }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(NoteGridPage);
