import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import { signout } from '../../../Auth/AuthActions';
import { AUTH_STAT } from '../../../Auth/AuthConstants';
import Form from '../../../../components/form';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import { browserHistory } from 'react-router';

// Import Style
import styles from './Header.css';
class Header extends React.Component {
  state = {
    isDrawerOpen: false,
    anchorEl: null,
  };

  toggleDrawer = (shouldDrawerOpen) => () => {
    this.setState({
      isDrawerOpen: shouldDrawerOpen,
    });
  };

  renderSidelist = () => {
    return (
      <div className={styles.drawer_list}>
        <List>
          <ListItem button>
            <ListItemText
              primary="Browse Notes"
              onClick={() => {browserHistory.push('/notes')}} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="My Notes" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText
            primary="My Cheatsheets"
            onClick={() => {browserHistory.push('/cheatsheets')}} />
          </ListItem>
        </List>
      </div>
    );
  }

  renderUserButton = () => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          color="contrast"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onRequestClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleUserProfileClicked}>Profile</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };


  handleLogout = event => {
    this.toggleDrawer(false)
    this.props.dispatch(signout());
  };

  handleUserProfileClicked = () => {
    this.toggleDrawer(false)
    browserHistory.push('/userprofile');
  };
  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  }
  render() {
    const titleStyle = {
      flex: 1,
    };
    const { auth_status } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/userprofile" />;
    }

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={styles.menuButton} color="contrast" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={titleStyle}>
            Study Genie
          </Typography>
          <Form dispatch={this.props.dispatch} />
          {/* auth_status === AUTH_STAT.AUTHENTICATED ? <Form dispatch={this.props.dispatch} /> : null */}
          <Drawer open={this.state.isDrawerOpen} onRequestClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              {this.renderSidelist()}
            </div>
          </Drawer>
          {auth_status === AUTH_STAT.AUTHENTICATED ? this.renderUserButton() : null}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth_status: PropTypes.string.isRequired,
}

export default Header;
