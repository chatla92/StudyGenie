import React from 'react';
import PropTypes from 'prop-types';

import NoteAddIcon from 'material-ui-icons/NoteAdd';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import green from 'material-ui/colors/green';
import Switch from 'material-ui/Switch';

// Import Style
import style from './NoteCreateWidget.css';

const styles = theme => ({
  card: {
    maxWidth: 400,
    height: 400,
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class NoteCreateWidget extends React.Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedE: true,
  };
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const iconStyle = { color: '#999', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '60%', height: '60%' };
    const { classes } = this.props;
    return (
      <div className={style.root}>
        <Card className={classes.card}>
          <CardHeader
            title="Add a New Note"
          />
          <CardContent>
            <NoteAddIcon
              style={iconStyle}
              onClick={() => { this.props.requestComposer(true); }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}
NoteCreateWidget.propTypes = {
  requestComposer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoteCreateWidget);
