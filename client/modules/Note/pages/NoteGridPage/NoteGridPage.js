import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import NoteGrid from '../../components/NoteGrid';
import NoteCreateWidget from '../../components/NoteCreateWidget/NoteCreateWidget';

// Import Actions
import { addNoteRequest, fetchNotes, deleteNoteRequest } from '../../NoteActions';

// Import Selectors
import { getNotes } from '../../NoteReducer';

class NoteGridPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchNotes());
  }

  handleDeleteNote = note => {
    if (confirm('Do you want to delete this note')) { // eslint-disable-line
      this.props.dispatch(deleteNoteRequest(note));
    }
  };

  handleAddNote = (name, title, content) => {
    this.props.dispatch(addNoteRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        {/* <NoteCreateWidget addNote={this.handleAddNote} /> */}
        <NoteGrid handleDeleteNote={this.handleDeleteNote} notes={this.props.notes} />
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
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

NoteGridPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(NoteGridPage);
