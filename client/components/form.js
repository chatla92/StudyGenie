import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AutoComplete from '../components/autocomplete';
import AutoContent from '../components/autocontent';
import Button from 'material-ui/Button';

import NoteActions from '../modules/Note/NoteActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: '0 5 5 5',
  },
});

class SimpleSelect extends React.Component {
  state = {
    contentQuery : '',
    tagQuery : '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAutoContent(e) {
    this.setState({
      contentQuery: e.target.value,
    })
  }

  handleAutoContent(e) {
    this.setState({
      tagQuery: e.target.value,
    })
  }

  search = () => {
    const { tagQuery, contentQuery } = this.state;
    this.props.dispatch(NoteActions.fetchNotes({pageNumber: 1, contentQuery, tagQuery}));
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <AutoContent onChange={this.handleAutoContent}/>
        <AutoComplete />
        <Button
          raised
          onClick={this.search}
          color="secondary"
          className={classes.button}>Search</Button>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleSelect);
