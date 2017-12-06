import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import style from './CheatSheetDetailsPage.css';

import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';
import NoteGrid from '../../Note/components/NoteGrid';

import Editor from '../../../components/editor';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    width: '100%',
    height: 700,
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
    height: 'calc(100% - 56px)',
    width: '100%',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },  
  flex: {
    flex: 1
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
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    }
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography type="title" color="inherit" noWrap className={classes.flex}>
              {cheatsheet ? <strong>{cheatsheet.title}</strong> : null}
              </Typography>
              <Button onClick={function(){browserHistory.push('/cheatsheets')}} color="contrast">Save</Button>
            </Toolbar>
          </AppBar>
          {before}
          <Editor className={style.cheatsheetContainer} content={(cheatsheet ? '<strong>'+cheatsheet.title+'</strong><p>'+cheatsheet.content+'</p>' : '')} />
          {after}
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
