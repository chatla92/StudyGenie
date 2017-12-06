import React from 'react';
import PropTypes from 'prop-types';

import styles from './NoteGrid.css';

// Import Components
import NoteGridItem from './NoteGridItem/NoteGridItem';
import NoteCreateWidget from './NoteCreateWidget/NoteCreateWidget';
import { GridList, GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

class NoteGrid extends React.Component {
  render() {
    const { cols } = this.props;

  return (
    <div className={styles.gridContainer}>
      <GridList cellHeight={250} cols={cols} spacing={10} className={styles.gridList}>
        <GridListTile key={"NoteCreateWidget"} cols={1} rows={1} className={styles.tile}>
          <NoteCreateWidget requestComposer={this.props.requestComposer} />
        </GridListTile>
          {
            this.props.notes.map(note => (
              <GridListTile key={note.id} cols={1} rows={1} className={styles.tile}>
                <NoteGridItem
                  dispatch={this.props.dispatch}
                  note={note}
                  key={note.id}
                  onDelete={() => this.props.handleDeleteNote(note.id)}
                  requestEditor={this.props.requestViewer}
                />
              </GridListTile>
            ))
          }
        </GridList>
      </div>
    );
  }
}

NoteGrid.propTypes = {
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
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fullname: state.auth.fullname,
    username: state.auth.username,
  };
}

export default NoteGrid;
