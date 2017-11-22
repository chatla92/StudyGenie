import React, { PropTypes } from 'react';
import { GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import Paper from 'material-ui/Paper';

// Import Style
import styles from './NoteGridItem.css';

function NoteGridItem(props) {
  return (
    <div>
      <Paper className={styles.paper}>
        <span>{props.note.content}</span>
      </Paper>
      <GridListTileBar
        title={props.note.title}
        titlePosition="top"
        actionIcon={
          <IconButton>
            <StarBorderIcon color="white" />
          </IconButton>
        }
        actionPosition="left"
        className={styles.titleBar}
      />
    </div>
  );
}

NoteGridItem.propTypes = {
  note: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    cuid: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteGridItem;
