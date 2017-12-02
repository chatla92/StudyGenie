import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import ChipInput from '../../../../components/ChipInput';

import { addNoteRequest } from '../../NoteActions';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class NoteComposer extends Component {

  state = {
    title: '',
    content: '',
    sharedWith: [],
    tags: [],
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
    console.log(tags)
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
          <TextField
            onChange={this.handleContentChange}
            label="Note"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit}
            disabled={this.isSubmitAllowed()}
            color="primary">
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
};

export default NoteComposer;
