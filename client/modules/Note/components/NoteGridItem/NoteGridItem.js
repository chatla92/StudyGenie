import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './NoteGridItem.css';

function NoteGridItem(props) {
  return (
    <div className={styles['single-note']}>
      <h3 className={styles['note-title']}>
        <Link to={`/notes/${props.note.slug}-${props.note.cuid}`} >
          {props.note.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.note.name}</p>
      <p className={styles['note-desc']}>{props.note.content}</p>
      <p className={styles['note-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteNote" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

NoteGridItem.propTypes = {
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteGridItem;
