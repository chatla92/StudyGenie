import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/NoteListItem/NoteListItem.css';

// Import Actions
import { fetchNote } from '../../NoteActions';

// Import Selectors
import { getNote } from '../../NoteReducer';

export function NoteDetailPage(props) {
  return (
    <div>
      <Helmet title={props.note.title} />
      <div className={`${styles['single-note']} ${styles['note-detail']}`}>
        <h3 className={styles['note-title']}>{props.note.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.note.name}</p>
        <p className={styles['note-desc']}>{props.note.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
NoteDetailPage.need = [params => {
  return fetchNote(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    note: getNote(state, props.params.cuid),
  };
}

NoteDetailPage.propTypes = {
  note: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(NoteDetailPage);
