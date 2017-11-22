import React, { PropTypes } from 'react';
import styles from './NoteGrid.css';

// Import Components
import NoteGridItem from './NoteGridItem/NoteGridItem';
import { GridList, GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

function NoteGrid(props) {
  return (
    <div className={styles.gridContainer}>
      <GridList cellHeight={250} cols={5} spacing={10} className={styles.gridList}>
        <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
          <Subheader component="div">December</Subheader>
        </GridListTile>
          {
            props.notes.map(note => (
              <GridListTile key={note.cuid} cols={1} rows={1}>
                <NoteGridItem
                  note={note}
                  key={note.cuid}
                  onDelete={() => props.handleDeleteNote(note.cuid)}
                />
              </GridListTile>
            ))
          }
      </GridList>
    </div>
  );
}

NoteGrid.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    cuid: PropTypes.number.isRequired,
  })).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

export default NoteGrid;
