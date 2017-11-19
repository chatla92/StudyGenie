import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './NoteCreateWidget.css';

export class NoteCreateWidget extends Component {
  addNote = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addNote(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${styles.appear}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewNote" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.noteTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.noteContent} className={styles['form-field']} ref="content" />
          <a className={styles['note-submit-button']} href="#" onClick={this.addNote}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

NoteCreateWidget.propTypes = {
  addNote: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(NoteCreateWidget);
