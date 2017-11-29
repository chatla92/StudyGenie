import React from 'react';
import PropTypes from 'prop-types';

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
            <ListItemText primary="Browse Notes" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="My Notes" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="My Cheatsheets" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="My groups" />
          </ListItem>
        </List>
      </div>
    );
  }

  renderUserButton = () => {
    const { anchorEl }= this.state;
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
    this.props.dispatch(signout());
  };

  handleUserProfileClicked = () => {
    browserHistory.push('/userprofile');
  };

  render() {
    const titleStyle = {
      flex: 1,
    };
    const { auth_status } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={styles.menuButton} color="contrast" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={titleStyle}>
            Study Genie
          </Typography>
          <Form />
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
