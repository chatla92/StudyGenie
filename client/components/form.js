import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AutoComplete from '../components/autocomplete';
import AutoContent from '../components/autocontent';
import Button from 'material-ui/Button';

import { fetchNotes } from '../modules/Note/NoteActions';

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

  handleContentChange = (contentQuery) => {
    this.setState({
      contentQuery,
    })
  }

  handleTagChange = (tagQuery) => {
    this.setState({
      tagQuery,
    })
  }

  search = () => {
    const { tagQuery, contentQuery } = this.state;
    console.log("contentQuery")
    console.log(contentQuery);
    console.log("tagQuery");
    console.log(tagQuery)
    this.props.dispatch(fetchNotes({pageNumber: 1, contentQuery, tagQuery}));
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <AutoContent onAutoContentChange={this.handleContentChange}/>
        <AutoComplete onAutoCompleteChange={this.handleTagChange}/>
        <Button
          raised
          onClick={this.search}
          color="contrast"
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
