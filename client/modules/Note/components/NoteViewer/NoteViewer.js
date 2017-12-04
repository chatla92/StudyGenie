import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import ChipInput from '../../../../components/ChipInput';
import Editor from '../../../../components/editor_note';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class NoteViewer extends Component {

  handleSubmit = () => {
    this.props.requestViewer(false, this.props.openedNote);
    this.props.requestComposer(true, this.props.openedNote);
  };

  handleClose = () => {
    this.props.requestViewer(false, this.props.openedNote);
  };

  upTransition = (props) => {
    return <Slide direction="up" {...props} />;
  };

  render() {
    const title = this.props.openedNote==null ? '' : this.props.openedNote.title;
    const content = this.props.openedNote==null ? '' : this.props.openedNote.content;
    const tags = this.props.openedNote==null ? [] : this.props.openedNote.meta.tags;
    return (
      <Dialog
        fullScreen
        title="view card"
        transition={this.upTransition}
        keepMounted
        open={this.props.isViewerOpen}

      >
        <DialogTitle>
          <TextField
            disabled = {true}
            label= {title}
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
        <ChipInput
            value={tags}
         />
          <ChipInput
            placeholder="Share with"
          />
          <Editor content={content} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Edit Note
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NoteViewer.propTypes = {
  requestViewer: PropTypes.func.isRequired,
  isViewerOpen: PropTypes.bool.isRequired,
  requestComposer: PropTypes.func.isRequired,
  openedNote: PropTypes.object,
};

export default NoteViewer;
