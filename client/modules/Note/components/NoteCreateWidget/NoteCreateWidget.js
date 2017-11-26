import React from 'react';
import PropTypes from 'prop-types';

import NoteAddIcon from 'material-ui-icons/NoteAdd';
import Paper from 'material-ui/Paper';

// Import Style
import styles from './NoteCreateWidget.css';

function NoteCreateWidget(props) {
  const iconStyle = { color: '#999', display: 'block', width: '100%', height: '100%' };
  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <NoteAddIcon
          style={iconStyle}
          onClick={() => { props.requestComposer(true); }}
        />
        <div>Add a new note</div>
      </Paper>
    </div>
  );
}

NoteCreateWidget.propTypes = {
  requestComposer: PropTypes.func.isRequired,
};

export default NoteCreateWidget;
