import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CheatSheetList.css';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DescriptionIcon from 'material-ui-icons/Description';

import { withRouter } from 'react-router';

class CheatSheetList extends Component {

  handleCheatsheetClick = (id) => {
    const clickedCheatsheet = this.props.cheatsheets.filter(cheatsheet => cheatsheet.id === id)[0];
    this.props.router.push({
      pathname: `/cheatsheets/${clickedCheatsheet.id}`,
      state: {
        cheatsheet: clickedCheatsheet,
      },
    });
  }

  render() {
    return (
      <div className={styles.listContainer}>
        <List>
          {
            this.props.cheatsheets.map(cheatsheet => (
              <ListItem
                onClick={this.handleCheatsheetClick.bind(this, cheatsheet.id)}
                button
                key={cheatsheet.title}
              >
                <Avatar>
                  <DescriptionIcon />
                </Avatar>
                <ListItemText
                  primary={cheatsheet.title}
                  secondary={cheatsheet.content}
                />
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}


CheatSheetList.propTypes = {
  cheatsheets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  })).isRequired,
  handleDeleteNote: PropTypes.func,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(CheatSheetList);
