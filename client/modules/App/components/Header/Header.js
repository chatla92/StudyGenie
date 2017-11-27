import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

// Import Style
import styles from './Header.css';
class Header extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = (shouldDrawerOpen) => () => {
    this.setState({
      isDrawerOpen: shouldDrawerOpen,
    });
  };

  render() {
    const sideList = (
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

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={styles.menuButton} color="contrast" aria-label="Menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit">
            Study Genie
          </Typography>
          <Drawer open={this.state.isDrawerOpen} onRequestClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              {sideList}
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
