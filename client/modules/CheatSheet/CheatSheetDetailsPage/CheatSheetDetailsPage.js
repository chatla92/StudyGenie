import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './CheatSheetDetailsPage.css';
import Paper from 'material-ui/Paper';

class CheatSheetDetailsPage extends Component {
  state = {
    cheatsheet: null,
  }

  componentWillMount() {
    const { state } = this.props.location;
    if (this.state.cheatsheet != null) {
      return;
    }
    if (state && state.cheatsheet) {
      this.setState({
        cheatsheet: (state && state.cheatsheet ? state.cheatsheet : null),
      });
    } else {
      this.setState({
        cheatsheet: { id: -1, title: 'No title', content: 'There is no content' },
      });
    }
  }

  render() {
    const { cheatsheet } = this.state;
    return (
      <div className={styles.cheatsheetContainer}>
        <Paper className={styles.cheatsheetPaper}>
          {cheatsheet ? <strong>{cheatsheet.title}</strong> : null}
          {cheatsheet ? <p>{cheatsheet.content}</p> : null}
        </Paper>
      </div>
    );
  }
}

CheatSheetDetailsPage.propTypes = {
  id: PropTypes.number,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

export default CheatSheetDetailsPage;
