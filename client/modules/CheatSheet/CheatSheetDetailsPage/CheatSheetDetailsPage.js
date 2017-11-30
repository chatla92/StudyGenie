import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './CheatSheetDetailsPage.css';
import Paper from 'material-ui/Paper';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import NoteGrid from '../../Note/components/NoteGrid';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: 100,
    width: '18cm',
    height: '27.7cm',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class CheatSheetDetailsPage extends Component {
  state = {
    cheatsheet: null,
    anchor: 'left',
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

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { cheatsheet } = this.state;
    const { anchor } = this.state;
    const { classes } = this.props;

    const drawer = (
      <Drawer
        type="permanent"
        classes={{
          paper: classes.drawerPaper,
          title: 'Available Notes',
        }}
        anchor={anchor}
      >
        <NoteGrid
          cols={1}
          handleDeleteNote={this.handleDeleteNote}
          notes={this.props.notes}
        />
        </Drawer>
    );

    let before = null;

    if (anchor === 'left') {
      before = drawer;
    }
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography type="title" color="inherit" noWrap>
              {cheatsheet ? <strong>{cheatsheet.title}</strong> : null}
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classes.content}>
            <Typography type="body1">
            {cheatsheet ? <p>{cheatsheet.content}</p> : null}
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

CheatSheetDetailsPage.propTypes = {
  id: PropTypes.number,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

function mapStateToProps(state) {
  return {
    notes: state.notebook.notes,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CheatSheetDetailsPage));
