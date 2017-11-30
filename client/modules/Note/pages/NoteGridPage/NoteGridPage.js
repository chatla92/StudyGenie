import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Import Components
import NoteGrid from '../../components/NoteGrid';
import NoteComposer from '../../components/NoteComposer/NoteComposer';
import NoteViewer from '../../components/NoteViewer/NoteViewer';

// Import Actions
import { addNoteRequest, fetchNotes, deleteNoteRequest } from '../../NoteActions';

// Import Selectors
import { getNotes } from '../../NoteReducer';

class NoteGridPage extends Component {
  state = {
    isComposerOpen: false,
    isViewerOpen: false,
    openedNote: null,
  }

  componentDidMount() {
    this.props.dispatch(fetchNotes());
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
    return (
      <div>
        <NoteGrid
          requestComposer={this.requestComposer}
          requestViewer ={this.requestViewer}
          handleDeleteNote={this.handleDeleteNote}
          notes={this.props.notes}
        />
        <NoteComposer
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
  };
}

NoteGridPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

NoteGridPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NoteGridPage);
