import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import ChipInput from '../../../../components/ChipInput';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class NoteComposer extends Component {

  handleSubmit = () => {
    this.props.requestComposer(false);
  };

  handleClose = () => {
    this.props.requestComposer(false);
  };

  // createNote = () => {
  //   const { title, tags, content } = this.state;
  //   const { dispatch } = this.props;
  //   dispatch(authActions.createNote({
  //     username,
  //     password,
  //     fullname,
  //   }));
  // };

  // handleTitleChange = (e) => {
  //   this.setState({
  //     fullname: e.target.value,
  //   });
  // };
  //
  //
  // handleTagsChange = (e) => {
  //   this.setState({
  //     username: e.target.value,
  //   });
  // };
  //
  // handleContentChange = (e) => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };

  upTransition = (props) => {
    return <Slide direction="up" {...props} />;
  };

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
            label="Title"
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
          <ChipInput
            placeholder="Share with"
          />
          <ChipInput
            placeholder="Tags"
          />
          <TextField
            label="Note"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
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
};

export default NoteComposer;
