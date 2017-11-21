import React, { PropTypes } from 'react';

// Import Components
import NoteGridItem from './NoteGridItem/NoteGridItem';

function NoteGrid(props) {
  return (
    <div className="GridView">
      {
        props.notes.map(note => (
          <NoteGridItem
            note={note}
            key={note.cuid}
            onDelete={() => props.handleDeleteNote(note.cuid)}
          />
        ))
      }
    </div>
  );
}

NoteGrid.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default NoteGrid;
