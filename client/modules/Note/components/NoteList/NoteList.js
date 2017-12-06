import React from 'react';
import PropTypes from 'prop-types';

import styles from './NoteGrid.css';

// Import Components
import NoteGridItem from '../NoteGridItem/NoteGridItem';
import NoteCreateWidget from './NoteCreateWidget/NoteCreateWidget';
import List, { ListItem } from 'material-ui/List';

function NoteList(props) {
  const { cols } = props;

  return (
    <div className={styles.gridContainer}>
      <List className={styles.gridList}>
      {
        props.notes.map(note => (
          <ListItem key={note.id}
            <NoteGridItem
              note={note}
              key={note.id}
              onDelete={() => props.handleDeleteNote(note.id)}
              requestEditor={props.requestViewer}
            />
          </ListItem>
        ))
      }
      </List>
    </div>
  );
}


NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    owner: PropTypes.shape({
      fullname: PropTypes.string,
      username: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  requestComposer: PropTypes.func.isRequired,
  requestViewer: PropTypes.func.isRequired,
};

export default NoteList;
