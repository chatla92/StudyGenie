import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import ChipInput from '../../../../components/ChipInput';

import { addNoteRequest } from '../../NoteActions';

import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Switch from 'material-ui/Switch';

import { FormControlLabel } from 'material-ui/Form';
import Editor from '../../../../components/editor_note';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = {
  bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
};


class NoteComposer extends Component {

  state = {
    title: '',
    content: '',
    sharedWith: [],
    tags: [],
    public: false,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  submit() {
    const { title, content, tags } = this.state;
    const { dispatch } = this.props;
    dispatch(addNoteRequest(title, content, tags));
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });
  }

  handleSubmit = () => {
    this.submit();
    this.props.requestComposer(false, null);
  };

  handleClose = () => {
    this.props.requestComposer(false, null);
  };

  upTransition = (props) => {
    return <Slide direction="up" {...props} />;
  };

  isSubmitAllowed = () => {
    const { title, content } = this.state;
    return (!content || !title);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullScreen
        title="Add new card"
        transition={this.upTransition}
        keepMounted
        open={this.props.isComposerOpen}
      >
        <DialogTitle>
          <TextField
            onChange={this.handleTitleChange}
            label="Title"
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
          <ChipInput
            onChange={this.handleTagsChange}
            placeholder="Tags"
          />
          <Editor content={''} />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={
              <Switch
                classes={{
                  checked: classes.checked,
                  bar: classes.bar,
                }}
                checked={this.state.public}
                onChange={this.handleChange('public')}
                aria-label="notePublic"
              />
            }
            label="To make public, click the switch?"
          />

          <Button
            onClick={this.handleClose} color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            disabled={this.isSubmitAllowed()}
            color="primary"
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NoteComposer.propTypes = {
  requestComposer: PropTypes.func.isRequired,
  isComposerOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoteComposer);
